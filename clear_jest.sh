#!/bin/bash

# Ran into issue where files that were removed were sought by jest.
# Clearing the cache fixes that. Decided to clear the cache daily
# in a cron job so I don't have to chase that down again.

PROJECT_HOME=/home/anthony/React/snippets-front-end
JEST=$PROJECT_HOME/node_modules/.bin/jest

cd $PROJECT_HOME
$JEST --clearCache
