#!/bin/bash

dir=$(pwd)
for file in "$dir"/delivery_service/*.sql; do
  echo "$file"
  psql -U lucas -d master -a -f "$file"
done
