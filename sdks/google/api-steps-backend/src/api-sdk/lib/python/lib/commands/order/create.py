# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        create_data = self.get_argument("orders")

        # Initialize a service.
        service = self.get_ad_manager_service('OrderService')

        # Add orders.
        orders = service.createOrders(create_data)

        # Result
        result = []

        # Display results.
        for order in orders:
            result.append({
                "id": order['id'], 
                "name": order['name'],
            })

        return result
