#!/usr/bin/env bash

# Takes one argument, the name of the directory to zip
CUR_DIR=$(pwd)
cd $1
zip -r Cawley-Edwards_Austin_CS546_WS.zip . -x "*node_modules/" -x "node_modules/**"

cd $CUR_DIR