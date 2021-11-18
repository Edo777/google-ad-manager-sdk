# Import the library.
from googleads import ad_manager
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        LINE_ITEM_IDS = self.get_argument("lineitemIds")
        CREATIVE_IDS = self.get_argument("creativeIds")
        OVERRIDE_SIZES = self.get_argument("sizes")

        # Initialize appropriate service.
        service = self.get_ad_manager_service('LineItemCreativeAssociationService')

        licas = []
        for creative_id in CREATIVE_IDS:
            for line_item_id in LINE_ITEM_IDS:
                licas.append({'creativeId': creative_id, 'lineItemId': line_item_id, 'sizes' : OVERRIDE_SIZES})

        # Create the LICAs remotely.
        licas = service.createLineItemCreativeAssociations(licas)
        result = []

        for lica in licas:
            result.append({
                "creativeId": lica["creativeId"],
                "lineitemId": lica["lineItemId"],
            })

        # Display results.
        return result