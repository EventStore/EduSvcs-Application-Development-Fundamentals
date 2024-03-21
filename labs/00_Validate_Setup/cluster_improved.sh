#!/bin/bash
####
# Docker management script for Eventstore Training Classes
#####

####
# Check to see if instance is currently running
# If instance is running kill it and start fresh instance
########

#############
# Some bash notes for the curious
# ps --format returns just the names rather than the verbose table format
# grep -q is search in silent mode to prevent output to the terminal
# echo -e the -e allows echo of newline characters
#######
if docker ps --format '{{.Names}}'| grep -q esdb;
then echo -e '\nesdb docker container appears to be running\n';

#docker ps --format '{{.Names}}'

# The following steps work

# 1 kill the container

docker stop esdb-node

## Remove the instance
docker rm esdb-node

docker run -d --name esdb-node -it -p 2113:2113 -p 1113:1113 \
       eventstore/eventstore:lts --insecure --run-projections=All \
       --enable-external-tcp --enable-atom-pub-over-http

else
    docker run -d --name esdb-node -it -p 2113:2113 -p 1113:1113 \
	   eventstore/eventstore:lts --insecure --run-projections=All \
	  --enable-external-tcp --enable-atom-pub-over-http
fi

# Rerun the command in the start cluster script

# So I need an if test, like above, if no match then start cluster command from
# start_cluster.sh

# If there is a match then
# Docker stop esdb-node
# docker rm esdb-node
# then the command from the start_cluster.sh
