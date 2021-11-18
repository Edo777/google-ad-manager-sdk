# Import the library.
from googleads import ad_manager
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):

    # Generate custom targeting
    def generate_custom_targeting(self, data):
        pass

    # start execution
    @override_method
    def start_execution(self):
        create_data = self.get_argument("lineitems")

        # Initialize a service.
        service = self.get_ad_manager_service('LineItemService')

        # Make a request.
        # create_data
        created_line_items = service.createLineItems(create_data)
        result = []

        for line_item in created_line_items:
            result.append({
                "id": line_item["id"]
            })
            
        return result
