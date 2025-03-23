FROM node:lts-slim

WORKDIR /app

COPY package*.json ./
COPY .env .env

COPY . .

RUN apt-get update && apt-get install -y wait-for-it

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
