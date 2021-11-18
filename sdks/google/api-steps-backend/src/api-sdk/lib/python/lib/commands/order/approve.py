import datetime

# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    
    # Approve order
    def __approve(self, order_id):
         # Initialize a service.
        service = self.get_ad_manager_service('OrderService')

        # Generate bind variables
        today = datetime.date.today()

        # Not orders to approve
        orders_approved = 0        

         # Build statement
        statement = (self.get_ad_manager_statement_builder()
               .Where(('id =:order_id AND status in (\'DRAFT\', \'PENDING_APPROVAL\') '
                       'AND endDateTime >= :today AND isArchived = FALSE'))
                .WithBindVariable('order_id', order_id)
                .WithBindVariable('today', today))
        

        # Get orders by statement.
        result = service.performOrderAction({
            'xsi_type': 'ApproveAndOverbookOrders', 
            "skipInventoryCheck": True
            }, statement.ToStatement())

        # Sum approved orders count
        if result and int(result['numChanges']) > 0:
            orders_approved += int(result['numChanges'])
        
        # change statement offset
        statement.offset += statement.limit
        
        return orders_approved

    # start execution
    @override_method
    def start_execution(self):
        # Get order ids
        orderIds = self.get_argument("orderId")

        # Approve orders
        approved_orders_count = self.__approve(orderIds)

        # Positive result
        result = {"status" : "success", "result": approved_orders_count}

        # Negative result.
        if approved_orders_count == 0:
            result["status"] = "failed"

        return result
