# Lab Folder Instructions

## OO_validate_Setup

This Lab is included as a test to verify a working environment.

A working environment consists of:

1. A functioning environment to run the code
2. An instance of EventStoreDB running locally in unsecured mode


## Overview

Here is a list of the files in the folder and the functions they perform

  1. **start_cluster.sh**:  This will start a docker container running EventStoreDB in single node, unsecured mode

  2. **test_environment.js**:  Verifies that you have a working node environment

  3. **generate.js**:  Allows you to see and generate any events required up to a specific point in the demos and labs.


## Instructions

1. Start a Docker container running EventStoreDB.

Run start_cluster.sh by opening the terminal window in VS Code (embedded in Codespaces) and execute the command ```./start_cluster.sh```

Click on the browser icon (a little globe) in the PORTS tab.  Doing so will take you to the WebUI for EventStoreDB. Note you want port 2113.

2. Verify that your node environment is working

In the terminal window type this command.

```node test_environment.js```


You should see a single event returned to the console for each time you execute ```node test_environment.js```



