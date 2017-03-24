#!/bin/bash

PRODUCT_NAME="Feeder.zip"

rm $PRODUCT_NAME

VERSION=$(php -r "echo json_decode(file_get_contents('manifest.json'))->version;")

echo "=== Adding tag: $VERSION"
git tag -a $VERSION -m "Version: $VERSION" 2> /dev/null

echo "= Compiling"
./join.js

echo "=== Zipping"
{ git ls-files ; cat combined-files.txt ; } | zip -@ $PRODUCT_NAME 1> /dev/null

echo "= Restoring compiled files"
./unjoin.sh

echo "=== Done"
