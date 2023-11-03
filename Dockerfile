FROM node:18

WORKDIR /opt/lost-music/

COPY . .

RUN apt-get update && \
    apt-get install -y openssl && \
    npm install

RUN npx prisma generate

RUN npx prisma migrate dev

# Stage 2: Create production image
FROM node:18-slim

ENV NODE_ENV production

WORKDIR /opt/lost-music/

# Copy package files and install dependencies
COPY . .

RUN apt-get update && \
    apt-get install -y openssl && \
    npm install --only=production

CMD [ "node", "index.js" ]