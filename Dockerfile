#FROM ubuntu
#todo uporabiti pravilno verzijo
FROM node:18-alpine
WORKDIR /app
COPY polnilniceBackend/package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
