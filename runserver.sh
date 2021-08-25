#!/bin/bash

# I can choose a different port this way
export PORT=3000

# I have a dependency issue with "jest": "26.6.0" vs. version: 27.0.6.
# Well, testing spec-definitions doesn't work with the older jest.
# This gets rid of the long warning message when trying to start the
# server.
export SKIP_PREFLIGHT_CHECK=true

# Start up `react-scripts start`
yarn start
