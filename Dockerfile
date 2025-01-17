FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

# Install Python and pip
RUN apk add --no-cache python3 py3-pip

# Install PyTorch from a musl-compatible repository
RUN pip install --no-cache-dir torch torchvision -f https://alpine-pytorch.repo/musl

COPY .. .

EXPOSE 3000
CMD ["npm", "start"]
