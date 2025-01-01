FROM node:20-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ build-base

COPY package*.json ./

# Clean install dependencies and rebuild bcrypt
RUN npm ci --include=dev && \
    npm rebuild bcrypt --build-from-source

COPY . .

# Generate Prisma client
RUN npx prisma generate

CMD [ "npm", "run", "dev" ]
