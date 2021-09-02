FROM node:16.6.2-alpine

WORKDIR /usr/src/app

COPY svelte.config.js ./
COPY tailwind.config.cjs ./
COPY postcss.config.cjs ./
#COPY mdsvex.config.cjs ./
#COPY jsconfig.json ./
COPY tsconfig.json ./
COPY package*.json ./
COPY .env ./

RUN npm install

COPY ./src ./src
COPY ./static ./static
COPY ./.svelte-kit ./.svelte-kit

RUN npm run-script build

EXPOSE 3000

ENV HOST=0.0.0.0

CMD [ "node", "build" ]
