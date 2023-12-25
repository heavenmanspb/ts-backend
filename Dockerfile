FROM node:21-alpine as build
LABEL stage=builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY ./src ./src
COPY tsconfig.json .
RUN npm run build

FROM node:21-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev
COPY --from=build ./app/dist .
COPY ./version ./version
COPY ./migrations ./migrations
COPY ./knexfile.js ./knexfile.js
ENTRYPOINT ["/bin/sh", "-c", "npm run docker:db:migrate:up && NODE_ENV=dev node ./app.js"]
