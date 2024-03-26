# Lab Folder Instructions

## General Instructions

Welcome to the lab folders for an eventstore training course. 

These courses are designed to work with github codespaces.

See [here](https://github.com/features/codespaces) for documentation regarding codespaces. 

This repo can also be ran locally. 

You will need docker, nodejs and yarn installed locally in order to run it locally.

Here are the steps you would follow. 

1. git clone https://github.com/EventStore/training_developing_Event_Sourced_Applications_with_EventStoreDB.git

2. Start the docker container locally ```docker run -d --name esdb-node -it -p 2113:2113 -p 1113:1113 \
       eventstore/eventstore:lts --insecure --run-projections=All \
       --enable-external-tcp --enable-atom-pub-over-http```

3. The directory is set up as a yarn managed node.js project, you will need to have node and yarn installed. 

4. Run the tests in the lab folder ```00_Validate_Setup``` to verify a working local configuration

5. Note that vscode may prompt you to run a "devcontainer" locally, based on the configuration present in the ```.devcontainer``` file that is used to configure codespaces. Setting up that environment would be another option to execute the code locally. 


## Specific Folders

This directory has a folder for each lab. When switching to each folder to run a lab it is advised that you run the ```start_cluster.sh``` script. This will delete and refresh the docker container running eventstoreDB, thereby removing any artifacts from previous labs. 

## Folder Structure

In addition to the ```start_cluster.sh``` script, each folder will have code that you will complete. 

Each folder will have an ```instructions.md``` file with instructions specific to that lab. 

## 00_validate_Setup

Please validate that you have a working environment by switching to folder 00_Validate_Setup. Start by reading the ```instructions.md``` file in that directory

