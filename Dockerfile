FROM node:20.9.0-alpine

WORKDIR /usr/src/app

COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

COPY backend .

EXPOSE 3000

# `npm run start` generates the Swagger file and then starts the API.
CMD ["npm", "run", "start"]
