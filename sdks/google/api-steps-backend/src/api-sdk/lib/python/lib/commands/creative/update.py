# Import the library.
from googleads import ad_manager
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        c_ids = self.get_argument("creativeIds")
        update_data = self.get_argument("dataToUpdate")

        # Initialize a service.
        service = self.get_ad_manager_service('CreativeService')

        # Get statement and set query
        statement = (self.get_ad_manager_statement_builder()
                    .Where(('id IN (:creative_ids)'))
                    .WithBindVariable('creative_ids', c_ids)
                    .Limit(1))

        # Get lineitem
        response = service.getCreativesByStatement(statement.ToStatement())
        update_result = []

        if 'results' in response and len(response['results']):
            # Update each local line item by changing its delivery rate type.
            updated_creatives = []
            for creative in response['results']:
                for update_key in update_data:
                    creative[update_key] = update_data[update_key]
                    updated_creatives.append(creative)
        
            # Update line items remotely.
            creatives = service.updateCreatives(updated_creatives)
            
            # Display results.
            for creative in creatives:
                update_result.append({
                    "id": creative["id"],
                    "snippet": creative["snippet"],
                })

        return update_result
