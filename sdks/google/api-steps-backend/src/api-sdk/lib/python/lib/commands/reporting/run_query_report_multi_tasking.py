import tempfile

import time
import concurrent.futures

from datetime import datetime
from datetime import timedelta

# Import the library.
from ...decorators.override_method import override_method
from ...abstraction.commands.base_command import BaseCommand

from googleads import errors

class ExecuteCommand(BaseCommand):
    def multiprocessing_func(self, x):
        # time.sleep(2)
        return x

    # start execution
    @override_method
    def start_execution(self):
        results = []
        order_ids = [2,1]   

        with concurrent.futures.ProcessPoolExecutor() as ex:
            results = ex.map(self.multiprocessing_func, order_ids)

        return results