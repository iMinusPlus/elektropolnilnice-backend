#!/bin/bash

# Name of the Docker image
IMAGE_NAME="elp-backend"
# Name of the Docker container
CONTAINER_NAME="back"

# Check if a container with the specified image name is running
if docker ps -q -f "ancestor=$IMAGE_NAME" >/dev/null; then
    # If running, stop and remove the container
    echo "Container with image $IMAGE_NAME is running. Stopping and removing it."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    docker rmi $IMAGE_NAME
else
    # If not running, check if the image exists
    if docker image inspect $IMAGE_NAME >/dev/null 2>&1; then
        # If the image exists, start a container with it
        echo "Image $IMAGE_NAME exists. Starting container."
        docker run -d - $CONTAINER_NAME $IMAGE_NAME
    else
        # If the image doesn't exist, build it from Dockerfile and start a container
        echo "Image $IMAGE_NAME does not exist. Building it and starting container."
        docker build -t $IMAGE_NAME .
        docker run -d --name $CONTAINER_NAME $IMAGE_NAME
    fi
fi

