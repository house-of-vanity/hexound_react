import threading
from time import sleep

def worker():
    """thread worker function"""
    while True:
      print('Worker')
      sleep(10)

threads = []
for i in range(1):
    t = threading.Thread(target=worker)
    threads.append(t)
    t.start()
