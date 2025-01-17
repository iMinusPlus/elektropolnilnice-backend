FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

## Install Python
#RUN apk add --no-cache python3 py3-pip
#
### Copy requirements.txt (for Python) into the container
##COPY requirements.txt ./
#
## Install PyTorch and torchvision (CPU support)
#RUN pip3 install --no-cache-dir torch torchvision


COPY .. .

EXPOSE 3000
CMD ["npm", "start"]
