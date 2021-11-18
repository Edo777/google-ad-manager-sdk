import tempfile

from datetime import datetime
from datetime import timedelta

# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

from googleads import errors

class ExecuteCommand(BaseCommand):

    def __downLoadReport(self, report_job_options):
         # Initialize a DataDownloader.
        report_downloader = self.get_ad_manager_data_downloader()

        try:
            # Run the report and wait for it to finish.
            report_job_id = report_downloader.WaitForReport(report_job_options)
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

        return {"reportJobId" : report_job_id, "fileName": report_file.name}

    # Build report's query
    def __buildReportQuery(self, dimensions, metrics, date_range_type, start_date, end_date, order_id):
         # Create statement object to filter for an order.
        statement = (self.get_ad_manager_statement_builder()
                    .Where('ORDER_ID = :id')
                    .WithBindVariable('id', int(order_id))
                    .Limit(None)  # No limit or offset for reports
                    .Offset(None))

        # query
        query = {
                'dimensions': dimensions,
                # 'dimensionAttributes': [],
                'statement': statement.ToStatement(),
                'columns': metrics,
                'dateRangeType': date_range_type,
        }

        if(date_range_type == "CUSTOM_DATE"):
            # Set the start and end dates of the report to run (past 8 days).
            if(end_date == None):
                end_date = datetime.now().date()

            if(start_date == None):
                start_date = end_date - timedelta(days=8)

            start_date = str(start_date).split("-", maxsplit=3)
            end_date = str(end_date).split("-", maxsplit=3)
            
            # set start date
            query["startDate"] = {}
            query["startDate"]["year"]  = start_date[0]
            query["startDate"] ["month"]  = start_date[1]
            query["startDate"]["day"] = start_date[2]

            # set end date
            query["endDate"] = {}
            query["endDate"]["year"]  = end_date[0]
            query["endDate"] ["month"]  = end_date[1]
            query["endDate"]["day"] = end_date[2]


       
        return query


    # start execution
    @override_method
    def start_execution(self):
        # Take sended argumants
        order_id = self.get_argument("orderId")
        
        dimensions = self.get_argument("dimensions")
        metrics = self.get_argument("columns")
        start_date = self.get_argument("startDate")
        end_date = self.get_argument("endDate")
        date_range_type = self.get_argument("dateRangeType")


        # Create report job options.
        report_job_options = {
            'reportQuery': self.__buildReportQuery(
                dimensions = dimensions, 
                metrics=metrics, 
                date_range_type=date_range_type,
                start_date=start_date, 
                end_date=end_date, 
                order_id=order_id
            )
        }
        
        # download report
        return self.__downLoadReport(report_job_options)
         
