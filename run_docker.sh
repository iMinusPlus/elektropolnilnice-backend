#!/bin/bash
#This script is temporary and will be replaced with automation scripts in the future
# This script is used to run the Docker container on the azure VM


# Name of the Docker image
IMAGE_NAME="elp-backend1"
# Name of the Docker container
CONTAINER_NAME="back"

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [run|update]"
    exit 1
fi

if [ "$1" = "drun" ]; then
    echo "Running the application... (Use update if there is new code)"
    # Only run if app was stopped
    docker run -p 0.0.0.0:3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
elif [ "$1" = "dupgrade" ]; then
    echo "Restarting the application..."
    # Stop and remove all old images and containers
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    docker rmi $IMAGE_NAME
    # Build a new ones and start them up
    docker build -t $IMAGE_NAME .
    docker run -p 0.0.0.0:3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
elif [ "$1" = "upgrade" ]; then
    echo "Restarting detatched the application..."
    # Stop and remove all old images and containers
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    docker rmi $IMAGE_NAME
    # Build a new ones and start them up
    docker build -t $IMAGE_NAME .
    docker run -dp 0.0.0.0:3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
elif [ "$1" = "run" ]; then
    echo "Running detached application... (Use dupgrade if there is new code)"
        # Only run if app was stopped
        docker run -dp 0.0.0.0:3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
else
    echo "Invalid argument: $1"
    echo "Usage: $0 [run|update|dupgrade|drun]"
    exit 1
fi
