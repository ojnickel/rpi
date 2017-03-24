#!/bin/bash

echo "Making Safari extension..."

function realpath {
  echo `cd "$1" 2>/dev/null&&pwd||(cd "$(dirname "$1")";pwd|sed "s|/*\$|/${1##*/}|")`
}

function show-file {
  declare MY_INPUT=${@:-$(</dev/stdin)}
  for PARM in $MY_INPUT; do
    if [ -d $PARM ]; then
      cd $PARM
      for i in $(git ls-files); do
         echo "$PARM/$i"
      done
      cd ~-
    else
      echo $PARM
    fi
  done
}

rm -rf ../Feeder.safariextension
mkdir ../Feeder.safariextension

echo "Starting ..."
git ls-files | show-file | zip -@ ../Feeder.safariextension/f.zip 1> /dev/null
echo "..."
cd ../Feeder.safariextension
unzip f.zip > /dev/null
rm f.zip
cd - > /dev/null

echo "... Done"
