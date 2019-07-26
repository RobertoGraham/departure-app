ARG SOURCES_DIR=/src

FROM node:10.16.0-alpine AS builder
ARG SOURCES_DIR
WORKDIR $SOURCES_DIR
COPY package.json .
RUN npm install
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.17.2-alpine
ARG SOURCES_DIR
ENV BUS_API_URL=http://host.docker.internal:8080
ENV PORT=80
COPY server.conf.template /etc/nginx/conf.d
COPY --from=builder $SOURCES_DIR/build /usr/share/nginx/html
EXPOSE $PORT
CMD /bin/sh -c "envsubst '\$PORT \$BUS_API_URL' < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"