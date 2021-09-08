#!/bin/bash

# This runs all jest-cucumber specifications.
# It doesn't run the "standard" unit tests in the /src/ directory.
#
# I needed to add a "jest" section to package.json to get this to work.
#
# Usage:
#	$ ./run_specification.sh [DIR_OR_TEST_FILE] [OUTPUT_FILE]
# Example:
#	$ ./run_specifications.sh specs/step-definitions/CreateSnippet.steps.tsx /tmp/junk

YARN=~/.nvm/versions/node/v14.17.5/bin/yarn
SPECS_DIR="specs/step-definitions"		# default dir for jest-cucumber specs.

# Allow specification of directory or single test file from command line
DIR_OR_TEST_FILE=$1
if [[ "$DIR_OR_TEST_FILE" == "" ]]; then
	DIR_OR_TEST_FILE=$SPECS_DIR
fi

# The --color option is great for console, but it's not so good when directing to a file.
# Actually, most options aren't good when directing to a file.
OUTPUT_FILE=$2
if [[ "$OUTPUT_FILE" == "" ]]; then
	echo "Sending output to console"
	CMD="$YARN jest --detectOpenHandles --watch --color $DIR_OR_TEST_FILE"
else
	echo "Sending output to $OUTPUT_FILE"
	CMD="$YARN jest $DIR_OR_TEST_FILE > $OUTPUT_FILE"
fi
echo $CMD
eval $CMD
