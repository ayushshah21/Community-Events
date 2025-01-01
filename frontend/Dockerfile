FROM node:20-alpine

WORKDIR /app


COPY package*.json ./

# Clean install dependencies
RUN npm ci --include=dev

COPY . .