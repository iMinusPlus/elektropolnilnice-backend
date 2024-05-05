#!/bin/bash

# Name of the Docker image
IMAGE_NAME="elp-backend1"
# Name of the Docker container
CONTAINER_NAME="back"

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [run|update]"
    exit 1
fi

if [ "$1" = "run" ]; then
    echo "Running the application... (Use update if there is new code)"
    # Only run if app was stopped
    docker run -p 0.0.0.0:3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
elif [ "$1" = "update" ]; then
    echo "Restarting the application..."
    # Stop and remove all old images and containers
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    docker rmi $IMAGE_NAME
    # Build a new ones and start them up
    docker build -t $IMAGE_NAME .
    docker run -p 0.0.0.0:3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
else
    echo "Invalid argument: $1"
    echo "Usage: $0 [run|update]"
    exit 1
fi
