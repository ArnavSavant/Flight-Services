FROM node

WORKDIR /developer/nodejs/flights-service

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

CMD ["npm","run","dev"]