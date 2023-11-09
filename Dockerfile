FROM node:20.9.0-alpine

WORKDIR /usr/src/app

COPY backend /usr/src/app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
