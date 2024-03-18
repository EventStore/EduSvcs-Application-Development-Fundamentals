This is the repo for the Developers course

# Structure

The slides branch will be used for slide development

There is a vscode plugin for MARPIT to display slide preview.

This plugin does not seem to work automatically in codespaces, it might take a manual install.

Best Practice for now is to use VScode or the editor of your choice locally, and then commit changes to the slides branch.

I am not sure using a branch for slides is the best practice longterm, a more seasoned github user will have to advise.

# Main Branch for Course Content

For delivery of a training course we would have to find some way to make this content available or keep it available? Maybe Fork to a temporary repo at delivery time?

## Codespaces

The content is built with a configuration file for codespaces.

Codespaces provides a docker environment and a browser implementation of VScode.

## How to use codespaces

Click on the code button and launch

## Running EventstoreDB in the Docker container

Run this command in a terminal in vscode to launch eventstoredb

docker run -d --name esdb-node -it -p 2113:2113 -p 1113:1113 eventstore/eventstore:latest --insecure --run-projections=All --enable-external-tcp --enable-atom-pub-over-http

## Testing the functionality of your environment

node index.js will verify a working node environment

node append.js will append to a stream

node read.js will read from the stream and display in the console



