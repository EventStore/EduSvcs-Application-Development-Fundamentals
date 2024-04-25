Welcome to the GitHub Repo for the Developing Event Sourced Applications with EventStoreDB

# Overview

This content is meant to be be used as course content for Instructor Led delivery, or Self Paced. 

# Labs

You will find a "labs" directory in this content with a folder for each module, and sub folders for each lab. 

## Solutions
There is a solutions folder available but please try to work through the labs on your own before checking the solutions

## Running the Labs

This content is designed to be run in Github Codespaces. 

If you wanted to run it locally, you would have to start an EventStoreDB instance locally, a Docker container is available for that. 

**Please note that the instructor will only assist in debugging of Code ran in GitHub Codespaces, as that environment we can control. Your local environment might have different versions of software packages making it difficult for us to debug live in class. **

That said, the content should be easy to reproduce locally with a minor amount of effort.


# Programming Language

This content is written using Node.js.

## Why Node.js

We felt that using Node.JS we could reach the largest audience. 

## Some FAQ's

Why not TypeScript?

TypeScript is great, we love it, you should look into using it. But, Typescript is enhanced javascript, and your TypeScript code transpiles down to javascript code. By going straight to Javascript the course can focus on reading and writing events to EventStoreDB without getting distracted by Typescript=> Javascript discussion. If you learn to interact with EventStoreDB in javasctipt you will easilly be able to transfer those skills to TypeScript.

Why not Java? 

Jave is great, we love java. We just had to choose a language to focus on. The client libraries for each language are very similar, it is our assumption that a Java developer will be able to take what they learn from this class and apply it to Java. 

Why not Python?

Python is great, we love Python. We just decided to teach this in nodeJS, it is our assumption that a Python developer will be able to take what they learn here and apply it to an application built in Python. 

Why not .NET? 

.NET is great, EventStoreDB is written in .NET. We felt an interpretted language is best for a general audience. 

## Codespaces

The content is built with a configuration file for codespaces.

That is the .devcontainer file you see as part of the repo. Please do not edit that. 

Codespaces provides a docker environment and a browser implementation of VScode.


## How to use codespaces

The Instructor will demonstrate

## Running EventstoreDB in the Docker container

This repo provides a shell script that will start and restart the EventStoreDB docker container local to the CodeSpaces container. 

The Instructor will demonstrate.

**NOTE** The course is written so that each user has their own instance of EventStoreDB.

**NOTE** Running ./start_cluser.sh will clear you current EventStoreDB instance and return an Empty instance. This is also by design. This allows to isolate each exercise and avoid dependencies or conflicts. 


