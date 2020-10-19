#!/bin/bash

set -e

if [ "$2" != "-n" ];
then

    # make data directory in ui folder
    rm -rf ui/src/data
    mkdir ui/src/data

    # generate json
    python3 -m app -s $1 -c ppc
    python3 -m app -s $1 -c sadm
    python3 -m app -s $1 -c ii
    python3 -m app -s $1 -c we

    # move to data directory
    mv *.json ui/src/data

fi

cd ui

npm run deploy
