#!/bin/bash

# I can choose a different port this way
export PORT=3000

# This didn't work to eliminate the myriad warning messages. Wish it did.
# export SKIP_PREFLIGHT_CHECK=eslint
# export SKIP_PREFLIGHT_CHECK=true

# Start up `react-scripts start`
yarn start
