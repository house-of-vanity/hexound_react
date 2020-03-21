!#/bin/bash

find ../hexound.ru/old/mods/ -exec curl -X POST localhost:5000/upload -F 'file=@{}' -i \;
