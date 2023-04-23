#!/bin/bash

dir=$(pwd)
for file in "$dir"/company/*.sql; do
  echo "$file"
  psql -U lucas -d master -a -f "$file"
done
