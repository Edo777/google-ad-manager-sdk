# Import the library.
from googleads import ad_manager
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        keys = self.get_argument("keys")

        # Initialize a service.
        service = self.get_ad_manager_service('CustomTargetingService')

        if keys:
             # Build statement
            statement = (self.get_ad_manager_statement_builder()
                .Where('customTargetingKeyId IN (:keyIds)' )
                .WithBindVariable('keyIds', keys))

            values = []
            
            while True:
                 response = service.getCustomTargetingValuesByStatement(statement.ToStatement())

                 if 'results' in response and len(response['results']):
                     for custom_targeting_value in response['results']:
                        values.append({
                            "id" : custom_targeting_value["id"],
                            "name" : custom_targeting_value["name"],
                            "displayName" : custom_targeting_value["displayName"]
                        })
                 else:
                    break
                
                 statement.offset += statement.limit
            return values