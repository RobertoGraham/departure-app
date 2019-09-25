ARG SOURCES_DIR=/src

FROM node:12.10.0-alpine AS builder
ARG SOURCES_DIR
WORKDIR $SOURCES_DIR
COPY package.json .
RUN npm install
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.17.4-alpine
ARG SOURCES_DIR
ENV BUS_API_URL=http://host.docker.internal:8080
ENV PORT=80
COPY nginx/default.conf.template /etc/nginx/conf.d
COPY --from=builder $SOURCES_DIR/build /usr/share/nginx/html
EXPOSE $PORT
CMD envsubst '\$PORT \$BUS_API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
  && nginx -g 'daemon off;'