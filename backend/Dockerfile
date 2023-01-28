FROM node:19-alpine AS api

USER node

RUN mkdir /home/node/backend

WORKDIR /home/node/backend

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn

COPY --chown=node:node . .

CMD ["sh", "-c", "yarn run start:dev"]
