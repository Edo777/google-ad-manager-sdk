import tempfile

from datetime import datetime
from datetime import timedelta

# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

from googleads import errors

class ExecuteCommand(BaseCommand):
    # start execution
    @override_method
    def start_execution(self):
        order_id = self.get_argument("orderId")
        # order_id = self.get_argument("dimensions")
        # date_opts = self.get_argument("dateOptions")

         # Create statement object to filter for an order.
        statement = (self.get_ad_manager_statement_builder()
                    .Where('ORDER_ID = :id')
                    .WithBindVariable('id', int(order_id))
                    .Limit(None)  # No limit or offset for reports
                    .Offset(None))

        # Set the start and end dates of the report to run (past 8 days).
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=8)

        # Create report job.
        report_job = {
            'reportQuery': {
                'dimensions': ['ORDER_ID', 'ORDER_NAME', 'LINE_ITEM_ID', 'LINE_ITEM_NAME'],
                'dimensionAttributes': ['ORDER_TRAFFICKER', 'ORDER_START_DATE_TIME',
                                        'ORDER_END_DATE_TIME'],
                'statement': statement.ToStatement(),
                'columns': ['AD_SERVER_IMPRESSIONS', 'AD_SERVER_CLICKS',
                            'AD_SERVER_CTR', 'AD_SERVER_CPM_AND_CPC_REVENUE',
                            'AD_SERVER_WITHOUT_CPD_AVERAGE_ECPM'],
                'dateRangeType': 'CUSTOM_DATE',
                'startDate': start_date,
                'endDate': end_date
            }
        }

        # Initialize a DataDownloader.
        report_downloader = self.get_ad_manager_data_downloader()

        try:
            # Run the report and wait for it to finish.
            report_job_id = report_downloader.WaitForReport(report_job)
        except errors.AdManagerReportError as e:
            print('Failed to generate report. Error was: %s' % e)
            exit(1)

        # Change to your preferred export format.
        export_format = 'CSV_DUMP'

        report_file = tempfile.NamedTemporaryFile(suffix='.csv.gz', delete=False)

        # Download report data.
        report_downloader.DownloadReportToFile(
            report_job_id, export_format, report_file)

        report_file.close()

        # Display results.
        return {"report_job_id" : report_job_id, "file_name": report_file.name}
