#!/bin/bash
for file in $(ls *.csv)
do
  FILE=$file node index.js | json_pp > $file.json
done
