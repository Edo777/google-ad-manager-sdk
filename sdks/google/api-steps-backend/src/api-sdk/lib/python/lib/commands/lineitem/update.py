# Import the library.
from googleads import ad_manager
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        l_ids = self.get_argument("lineitemIds")
        update_data = self.get_argument("dataToUpdate")

        # Initialize a service.
        service = self.get_ad_manager_service('LineItemService')

        # Get statement and set query
        statement = (self.get_ad_manager_statement_builder()
                    .Where('id IN (:lineitem_ids)')
                    .WithBindVariable('lineitem_ids', l_ids))

        # Get lineitem
        response = service.getLineItemsByStatement(statement.ToStatement())
        update_result = []

        if 'results' in response and len(response['results']):
            # Update each local line item by changing its delivery rate type.
            updated_line_items = []
            for line_item in response['results']:
                if not line_item['isArchived']:

                    for update_key in update_data:
                        # print(update_key)

                        line_item[update_key] = update_data[update_key]
                        updated_line_items.append(line_item)
        
            # Update line items remotely.
            line_items = service.updateLineItems(updated_line_items)
            
            
            
            # Display results.
            if line_items:
                for line_item in line_items:
                    update_result.append({
                        "id": line_item["id"],
                        "name": line_item["name"],
                        "orderId": line_item["orderId"],
                    })

        return update_result
