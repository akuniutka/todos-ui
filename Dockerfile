FROM node:12.2.0-alpine

ENV VUE_APP_BACKEND_URL http://localhost:8080/api

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# start app
CMD ["npm", "run", "serve"]