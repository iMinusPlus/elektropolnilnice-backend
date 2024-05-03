#!/bin/zsh

docker run -dp 0.0.0.0:3000:3000 -v . --restart=unless-stopped elp1