FROM node:16-alpine

WORKDIR /boilerplate-typescript

COPY . /boilerplate-typescript

RUN npm install

ENTRYPOINT [ "node", "--es-module-specifier-resolution=node", "dist/src/app.js" ]