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


# Check to see if docker container is already running
# If yes, kill it and restart
# If no, download and start


#!/bin/bash
####
# Docker management script for Eventstore Training Classes
#####

#!/bin/bash
####
# Docker management script for Eventstore Training Classes
#####

#!/bin/bash
####
# Docker management script for Eventstore Training Classes
#####


# Docker container name
container_name="esdb-node"

# Check if the Docker container is already running
if docker ps --format '{{.Names}}' | grep -q "$container_name"; then
    echo -e "\n$container_name Docker container appears to be running\n"

    # Stop the existing container
    if docker stop "$container_name"; then
        echo -e "\nStopping the container\n"
    fi

    # Remove the existing container
    if docker rm "$container_name"; then
        echo -e "\nRemoving the container\n"
    fi
fi


# Check if the Docker container is already running
if ! docker ps --format '{{.Names}}' | grep -q "$container_name"; then
    echo -e "\n$container_name Docker container appears to NOT be running\n"
fi

# Start a new container
if ! docker run -d --name "$container_name" -it -p 2113:2113 -p 1113:1113 \
    eventstore/eventstore:lts --insecure --run-projections=All \
    --enable-external-tcp --enable-atom-pub-over-http; then
    handle_error "Failed to start a new $container_name container"
fi

echo "Docker container $container_name started successfully"
