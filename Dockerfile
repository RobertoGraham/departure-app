ARG SOURCES_DIR=/src

FROM node:18.13.0-alpine3.17 AS builder
ARG SOURCES_DIR
WORKDIR $SOURCES_DIR
COPY package.json .
RUN npm install
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.19.8-alpine
ARG SOURCES_DIR
ENV DEPARTURE_API_URL=http://host.docker.internal:8080
ENV PORT=80
ENV REDIRECT_HOSTNAME=localhost
LABEL org.opencontainers.image.source=https://github.com/robertograham/departure-app
COPY nginx/default.conf.template /etc/nginx/conf.d
COPY --from=builder $SOURCES_DIR/build /usr/share/nginx/html
EXPOSE $PORT
CMD envsubst '\$PORT \$DEPARTURE_API_URL \$REDIRECT_HOSTNAME' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
  && nginx -g 'daemon off;'