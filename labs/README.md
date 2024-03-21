# Lab Folder Instructions

## First Step

Please validate that you have a working environment by switching to folder 00_Validate_Setup

Here is a list of the files in the folder and the functions they perform

start_cluster.sh

This will start a docker container running eventstoredb in single node, unsecured mode

test_node.js

Verifies that you have a working node environment

test_append.js

Verifies that you can write an event to a stream into the esdb instance running in a docker container

test_read.js

Verifies that you can read back the events that were written in test_append.js

Note that ```test_read.js``` has no error handling code built in, the goal was to keep this code simple, if ```test_read.js``` returns an error it is most likely because you have to run ```test_append.js``` first