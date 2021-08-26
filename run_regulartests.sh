#!/bin/bash

YARN=~/.nvm/versions/node/v14.17.5/bin/yarn
SRC="./src/"

DIR=$1
if [[ "$DIR" == "" ]]; then
	DIR=$SRC
fi

$YARN jest --detectOpenHandles --watch --color $DIR
