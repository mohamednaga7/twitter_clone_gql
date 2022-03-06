FROM node:lts-alpine

RUN npm install -g pm2

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["pm2-runtime", "npm", "--", "start"]