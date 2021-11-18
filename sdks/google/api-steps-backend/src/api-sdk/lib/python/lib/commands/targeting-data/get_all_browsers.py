import tempfile

# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        # Initialize a DataDownloader.
        report_downloader = self.get_ad_manager_data_downloader()

        with tempfile.NamedTemporaryFile(
            prefix='browser_data_',
            suffix='.csv', mode='w', delete=False) as browser_data_file:

            browser_pql_query = ('SELECT Id, BrowserName, MajorVersion, MinorVersion '
                         'FROM Browser '
                         'ORDER BY BrowserName ASC')
                        
            report_downloader.DownloadPqlResultToCsv(browser_pql_query, browser_data_file)

        return {"fileName" : browser_data_file.name}