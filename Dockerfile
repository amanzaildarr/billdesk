
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

WORKDIR /backend

COPY package.json .

RUN npm i -g @nestjs/cli

RUN yarn install

COPY . .

RUN yarn build

RUN npm i -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm", "--name", "backend", "--", "run", "start:prod"]