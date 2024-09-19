# Lab Folder Instructions

## General Instructions

Several Event Store courses are designed to work with GitHub codespaces.

See [here](https://github.com/features/codespaces) for documentation regarding codespaces. 

This repo can also be run locally. You will need Docker, Node.js, and yarn installed locally to do so.

Steps to run locally:

1. git clone https://github.com/EventStore/training_developing_Event_Sourced_Applications_with_EventStoreDB.git

2. Start the docker container locally ```docker run -d --name esdb-node -it -p 2113:2113 -p 1113:1113 \
       eventstore/eventstore:lts --insecure --run-projections=All \
       --enable-external-tcp --enable-atom-pub-over-http```

3. The directory is set up as a yarn-managed node.js project.  You must have node and yarn installed. 

4. Run the tests in the lab folder ```00_Validate_Setup``` to verify a working local configuration.

5. VScode may prompt you to run a "devcontainer" locally based on the configuration in the ```.devcontainer``` file used to configure codespaces. Setting up that environment would be another option for executing the code locally. 


## Specific Folders

This directory has a folder for each exercise. When accessing a folder to run a lab, you are advised to run the ```start_cluster.sh``` script. This will delete and refresh the Docker container running EventStoreDB, removing any artifacts from previous labs. 

## Folder Structure

In addition to the ```start_cluster.sh``` script, each folder will have code for you to complete and an ```instructions.md``` file specific to that lab. 

## 00_validate_Setup

Please validate that you have a working environment by reviewing folder 00_Validate_Setup. Start by reading the ```instructions.md``` file in that directory.

