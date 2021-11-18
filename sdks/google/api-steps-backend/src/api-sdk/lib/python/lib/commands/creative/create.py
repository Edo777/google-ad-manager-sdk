# Import the library.
from googleads import ad_manager
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        create_data = self.get_argument("creatives")

        # Initialize a service.
        service = self.get_ad_manager_service('CreativeService')

        # Make a request.
        #create_data
        created_creatives = service.createCreatives(create_data)
        result = []

        for creative in created_creatives:
            result.append({
                "id": creative["id"]
            })

        return result