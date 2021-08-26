#!/bin/bash

# This runs all jest-cucumber specifications.
# It doesn't run standard unit tests.

YARN=~/.nvm/versions/node/v14.17.5/bin/yarn
SPECS_DIR="specs/step-definitions"

DIR=$1
if [[ "$DIR" == "" ]]; then
	DIR=$SPECS_DIR
fi

$YARN jest --detectOpenHandles --watch --color $DIR
