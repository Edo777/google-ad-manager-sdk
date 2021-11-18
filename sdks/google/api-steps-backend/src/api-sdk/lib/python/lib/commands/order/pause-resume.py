import datetime

# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # pause orders
    def __execute_pause_or_resume(self, order_ids, action_type):
        service = self.get_ad_manager_service('OrderService')

         # Build statement
        statement = (self.get_ad_manager_statement_builder()
                .Where('id IN (:order_ids)')
                .OrderBy('id', ascending=True)
                .WithBindVariable('order_ids', order_ids))
        
        result_set_size = 0
        should_continue = True
        orders_paused = 0

        # Iterate over paged results from the statement.
        while should_continue:
            page = service.getOrdersByStatement(statement.ToStatement())
            if 'results' in page and len(page['results']):
                result_set_size = page['totalResultSetSize']

            # Update statement for next page.
            statement.offset += statement.limit
            should_continue = statement.offset < result_set_size
        
        if result_set_size > 0:
            statement.offset = None
            statement.limit = None

            action_options = { 'xsi_type': "PauseOrders"}

            if(action_type == "resume"):
                action_options['xsi_type'] = "ResumeOrders"
                action_options['skipInventoryCheck'] = True

            # Get orders by statement.
            result = service.performOrderAction(action_options, statement.ToStatement())

            # Sum approved orders count
            if result and int(result['numChanges']) > 0:
                orders_paused += int(result['numChanges'])
        
        return orders_paused

    # start execution
    @override_method
    def start_execution(self):
        # Get order ids
        order_ids = self.get_argument("orderIds")
        action_type = self.get_argument("action")

        # paused or resumed orders
        count = self.__execute_pause_or_resume(order_ids, action_type)

        # Positive result
        result = {"status" : "success", "result": count}

        # Negative result.
        if count == 0:
            result["status"] = "failed"

        return result
