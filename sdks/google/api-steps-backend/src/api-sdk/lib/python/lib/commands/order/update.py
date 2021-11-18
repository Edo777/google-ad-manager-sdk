# Import the library.
from googleads import ad_manager
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        order_ids = self.get_argument("orderIds")
        update_data = self.get_argument("dataToUpdate")

        # Initialize a service.
        service = self.get_ad_manager_service('OrderService')

        # Get statement and set query
        statement = (self.get_ad_manager_statement_builder()
                    .Where(("id IN (:orderIds)"))
                    .WithBindVariable('orderIds', order_ids))

        # Get lineitem
        response = service.getOrdersByStatement(statement.ToStatement())
        update_result = []

        if 'results' in response and len(response['results']):
            # Update each local line item by changing its delivery rate type.
            updated_orders = []
            for order in response['results']:
                if not order['isArchived']:

                    for update_key in update_data:
                        order[update_key] = update_data[update_key]
                        updated_orders.append(order)
        
            # Update orders remotely.
            orders = service.updateOrders(updated_orders)
            
            # Display results.
            if orders:
                for ord in orders:
                    update_result.append({
                        "id": ord["id"],
                        "name": ord["name"],
                        "advertiserId": ord["advertiserId"],
                        "status": ord["status"]
                    })

        return update_result
