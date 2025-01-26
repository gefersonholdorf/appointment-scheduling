FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 3000
