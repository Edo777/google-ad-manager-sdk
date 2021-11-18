# Import the library.
from googleads import ad_manager
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        keys = self.get_argument("keys")
        values = self.get_argument("values")
        operator = self.get_argument("operator")

        # Initialize a service.
        service = self.get_ad_manager_service('CustomTargetingService')

        # Add custom targeting keys.
        created_keys = service.createCustomTargetingKeys(keys)

        values_data = []
        for k in range(len(created_keys)):
            for v in range(len(values)):
                values_data.append({
                    "customTargetingKeyId" : created_keys[k]["id"],
                    "displayName" : values[v]["displayName"],
                    "name" : values[v]["name"],
                    "matchType":  values[v]["matchType"]
                })


        # Add custom targeting values.
        created_values = service.createCustomTargetingValues(values_data)

        # create criterias
        custom_criterias = []
        for k in range(len(created_keys)):
            criteria = {
                'xsi_type': 'CustomCriteria',
                'keyId': created_keys[k]["id"],
                'valueIds': [],
                'operator': operator
            }

            for v in range(len(created_values)):
                criteria["valueIds"].append(created_values[v]["id"])
            
            custom_criterias.append(criteria)
        
        

        # Generate result
        result = { "criterias" : custom_criterias }

        return result
