import datetime

# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # pause or resume line items
    def __execute_pause_or_resume(self, line_item_ids, action_type):
        service = self.get_ad_manager_service('LineItemService')

         # Build statement
        statement = (self.get_ad_manager_statement_builder()
                .Where('id IN (:line_item_ids) AND status IN (:statuses)')
                .OrderBy('id', ascending=True)
                .WithBindVariable('line_item_ids', line_item_ids)
                .WithBindVariable('statuses', ["PAUSED", "READY"]))
        
        result_set_size = 0
        should_continue = True
        line_items_modified = 0

        # Iterate over paged results from the statement.
        while should_continue:
            page = service.getLineItemsByStatement(statement.ToStatement())
            if 'results' in page and len(page['results']):
                result_set_size = page['totalResultSetSize']

            # Update statement for next page.
            statement.offset += statement.limit
            should_continue = statement.offset < result_set_size
        
        if result_set_size > 0:
            statement.offset = None
            statement.limit = None

            action_options = { 'xsi_type': "PauseLineItems"}

            if(action_type == "resume"):
                action_options['xsi_type'] = "ResumeAndOverbookLineItems"
                action_options['skipInventoryCheck'] = True

            # Get lineitems by statement.
            result = service.performLineItemAction(action_options, statement.ToStatement())

            # Sum modified lineitems count
            if result and int(result['numChanges']) > 0:
                line_items_modified += int(result['numChanges'])
        
        return line_items_modified

    # start execution
    @override_method
    def start_execution(self):
        # Get order ids
        line_item_ids = self.get_argument("lineItemIds")
        action_type = self.get_argument("action")

        # paused or resumed lineitmes
        count = self.__execute_pause_or_resume(line_item_ids, action_type)

        # Positive result
        result = {"status" : "success", "result": count}

        # Negative result.
        if count == 0:
            result["status"] = "failed"

        return result
