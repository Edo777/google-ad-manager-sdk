# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        create_data = self.get_argument("companies")

        # Initialize a service.
        service = self.get_ad_manager_service('CompanyService')

        # Add companies.
        companies = service.createCompanies(create_data)

        # Result
        result = []

        # Display results.
        for company in companies:
            result.append({
                "id": company['id'], 
                "name": company['name'], 
                "type": company['type']
            })

        return result
