#!/bin/bash

echo "updating NPM"
npm update
echo "updating typings"
typings ls | awk '$2 ~ /.+/ {print $2}' | xargs -I {} typings i dt~{} -SG