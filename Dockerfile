FROM node:18

WORKDIR /opt/lost-music/

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev

# Stage 2: Create production image
FROM node:18-slim

ENV NODE_ENV production

WORKDIR /opt/lost-music/

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production

CMD [ "node", "index.js" ]