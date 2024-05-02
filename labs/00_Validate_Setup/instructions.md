# Lab Folder Instructions

## OO_validate_Setup

This Lab is included as a test to verify a working environment.

A working environment consists of:

1. A functioning environment to run the code
2. An instance of EventStoreDB running locally in unsecured mode


## Overview

Here is a list of the files in the folder and the functions they perform

  1. **start_cluster.sh**:  This will start a docker container running EventStoreDB in single node, unsecured mode

  2. **test_node.js**:  Verifies that you have a working node environment

  3. **test_append.js**:  Verifies that you can write an event to a stream into the EventStoreDB instance running in a Docker container

  4.  **test_read.js**:  Verifies that you can read the events that were written in test_append.js

Note that ```test_read.js``` has no error handling code built in.  The goal for the training is to keep this code simple.  If ```test_read.js``` returns an error, it is most likely because ```test_append.js``` needs to be executed first.


## Instructions

1. Start a Docker container running EventStoreDB.

Run start_cluster.sh by opening the terminal window in VS Code (embedded in Codespaces) and execute the command ```./start_cluster.sh```

Click on the browser icon (a little globe) in the PORTS tab.  Doing so will take you to the WebUI for EventStoreDB. Note you want port 2113.

2. Verify that your node environment is working

In the terminal window type this command.

```node test_node.js```

3. Verify that you can append to a stream

Run this command to write an event to a stream.
```node test_append.js```

Check the webui in the ```Stream Browser``` tab you should see the stream ```test_Stream``` and the event you just wrote to the stream

```test_Stream```

4. Verify that you can read from the stream ```test_Stream```

Run this command in the terminal window.
```node test_read.js```

You should see a single event returned to the console for each time you execute ```node test_append.js```

Note that there is no error handling in the ```test_read.js``` if it returns an error, the most likely cause is a failure to run ```node test_append.js```




