FROM node:12.14

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn install

EXPOSE 80

ENV PORT=80

CMD [ "node", "index.js"]