!#/bin/bash

find . -exec curl -X POST localhost:5000/upload -F 'file=@{}' -i \;
