#!/bin/bash

CONTAINER_NAME="c-port-client"
IMAGE_NAME="s-port-client:v1"
PORT="5173"
VOLUME_PATH="$(pwd):/kyuuchan-199/app-s-port-client"
NODE_MODULES_VOLUME="/kyuuchan-199/app-s-port-client/node_modules"

# Check if the container already exists
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME exists. Starting it..."
    docker start $CONTAINER_NAME
else
    echo "Container $CONTAINER_NAME does not exist. Building the image and creating the container..."
    docker build --no-cache -t $IMAGE_NAME .
    docker run --name $CONTAINER_NAME -p $PORT:$PORT -v "$VOLUME_PATH" -v "$NODE_MODULES_VOLUME" $IMAGE_NAME
fi
