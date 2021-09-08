#!/bin/bash

# Example to run just the tests in a single file or directory:
# 	$ ./run_regulartests.sh src/pages/SubscribeSnippet/
# which is the same as issuing:
# 	$ yarn test src/pages/SubscribeSnippet/

YARN=~/.nvm/versions/node/v14.17.5/bin/yarn
SRC="./src/"		# This is the default directory for regular tests

# Allow for a passed directory or single test file
DIR_OR_TEST_FILE=$1
if [[ "$DIR_OR_TEST_FILE" == "" ]]; then
	DIR_OR_TEST_FILE=$SRC
fi

# Now run the command
$YARN jest --detectOpenHandles --watch --color $DIR_OR_TEST_FILE
