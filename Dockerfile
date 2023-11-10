FROM node:18-alpine

RUN apk --no-cache add git
WORKDIR /pokedex
COPY public/ /pokedex/public
COPY src/ /pokedex/src
COPY package.json /pokedex/
RUN npm install
EXPOSE 3000
CMD [ "npm","start" ]