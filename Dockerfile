ARG SOURCES_DIR=/src

FROM node:13.0.1-alpine AS builder
ARG SOURCES_DIR
WORKDIR $SOURCES_DIR
COPY package.json .
RUN npm install
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.17.10-alpine
ARG SOURCES_DIR
ENV DEPARTURE_API_URL=http://host.docker.internal:8080
ENV PORT=80
COPY nginx/default.conf.template /etc/nginx/conf.d
COPY --from=builder $SOURCES_DIR/build /usr/share/nginx/html
EXPOSE $PORT
CMD envsubst '\$PORT \$DEPARTURE_API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
  && nginx -g 'daemon off;'