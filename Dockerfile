FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install

# Install Python and pip using apt-get
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

#
### Copy requirements.txt (for Python) into the container
##COPY requirements.txt ./

## Install PyTorch and other Python dependencies
#RUN pip3 install --no-cache-dir torch torchvision

# Create a virtual environment and activate it
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install PyTorch inside the virtual environment
RUN pip install --no-cache-dir torch torchvision


COPY .. .

EXPOSE 3000
CMD ["npm", "start"]
