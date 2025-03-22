FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN apt-get update && apt-get install -y wait-for-it