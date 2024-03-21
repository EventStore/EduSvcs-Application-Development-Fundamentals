#!/bin/bash

docker run -d --name esdb-node -it -p 2113:2113 -p 1113:1113 \
eventstore/eventstore:lts --insecure --run-projections=All \
--enable-external-tcp --enable-atom-pub-over-http