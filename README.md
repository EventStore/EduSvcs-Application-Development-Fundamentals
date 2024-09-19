Welcome to the GitHub repository for the Event Store's **Application Development Fundamentals** training course.  
# Overview

This content will be used as course content for instructor-led and self-paced offerings.   

# Labs

The "labs" directory contains a folder for each module and sub-folders for each lab. 

## Solutions
Solutions are included in each module folder, but please try to work through the labs independently before checking the solutions.

## Running the Labs

The exercises are designed to be run in GitHub Codespaces. 

To run the code locally, you must start an EventStoreDB instance.  A Docker container is available for that. For more information on setting up your environment, please visit Event Store Academy's [From Scratch](https://academy.eventstore.com/from-scratch) series.  

**Please note that in live training events, the instructor can only assist in debugging code run in GitHub Codespaces, as that is a controlled environment. Your local environment might have different versions of software packages making it difficult for us to debug live in class. **

That said, the content should be easy to reproduce locally with a minor amount of effort.

# Programming Language

This code in this course is written using Node.js.

## FAQs

**Why not TypeScript?**

TypeScript is great.  We love it, and you should look into using it. But TypeScript is enhanced Javascript, and your TypeScript code transpilers down to Javascript code. By going straight to Javascript, the course can focus on reading and writing events to EventStoreDB without getting distracted by the TypeScript => Javascript discussion. If you learn to interact with EventStoreDB in Javascript, you will easily be able to transfer those skills to TypeScript.

**Why not Java?** 

Jave is great.  We love Java. Since the client libraries for each language are very similar, we assume that a Java developer will be able to take what they learn from this class and apply it to Java. 

**Why not Python?**

Python is great.  We love Python. We assume that a Python developer will be able to take what they learn here and apply it to an application built in Python. 

**Why not .NET?** 

.NET is great. EventStoreDB is written in .NET. However, we felt an interpreted language was best for a general audience. 

## Codespaces

The content is built using a configuration file for GitHub Codespaces, which provides a Docker environment and a browser implementation of VScode.

That is the .devcontainer file you see as part of the repo. **Please do not edit that**. 

## How to use codespaces

The instructor will demonstrate the usage of Codespaces during a live training class.  For those completing the course as a self-paced endeavor, please review Exercise 0.1 in Module 1.  

## Running EventstoreDB in the Docker container

This repo provides a shell script to start and restart the EventStoreDB Docker container local to the CodeSpaces container.  The course is written so that each user has their own instance of EventStoreDB.

**NOTE** Running ./start_cluser.sh will clear your current EventStoreDB instance and return an Empty instance. This is purposefully designed to isolate each exercise and avoid dependencies or conflicts. 

# Running the Content Locally

Full instructions on setting up a local Node environment are available in EventStoreDB's "[From Scratch]" (https://academy.eventstore.com/from-scratch)  series. 

To clone this repo and run the code locally, run the following in a terminal. 

```
git clone <repo name>
```

Once downloaded, you will to run ``` yarn install ``` to download the dependencies locally.

## Running the EventStoreDB Docker container locally

The content in this repository will work with a locally available EventStoreDB container running in unsecured mode.

Instructions: https://hub.docker.com/r/eventstore/eventstore.

The process is as follows:
1. Install Docker
2. Run
   ```docker run --name esdb-node -it -p 2113:2113 -p 1113:1113 \
    eventstore/eventstore:latest --insecure --run-projections=All \
    --enable-external-tcp --enable-atom-pub-over-http```

   
