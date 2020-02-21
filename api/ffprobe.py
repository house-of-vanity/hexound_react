import subprocess
import logging
import json

log = logging.getLogger("api." + __name__)

class Ffprobe:
    def __init__(self, path=None):
        self.metadata = dict()
        if path:
            self.metadata = self._metadata(path)
            
    def _metadata(self, path):
        cmd = "ffprobe -v quiet -print_format json -show_format"
        cmd = cmd.split()
        result = subprocess.run(cmd + [path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE)
        return json.loads(result.stdout)
