FROM node:16-alpine

WORKDIR /rio-atibaia-iot

COPY . /rio-atibaia-iot

RUN npm install
RUN npm run init

ENTRYPOINT [ "npm", "run", "start" ]