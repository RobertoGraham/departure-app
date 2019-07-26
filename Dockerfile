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
# RUN sed -i 's,#\(LoadModule rewrite_module modules/mod_rewrite.so\),\1,g' conf/httpd.conf \
#   && sed -i -e '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/{s/AllowOverride None/AllowOverride All/}' conf/httpd.conf \
#   && sed -i 's,#\(LoadModule proxy_module modules/mod_proxy.so\),\1,g' conf/httpd.conf \
#   && sed -i 's,#\(LoadModule proxy_http_module modules/mod_proxy_http.so\),\1,g' conf/httpd.conf \
#   && sed -i 's,#\(LoadModule ssl_module modules/mod_ssl.so\),\1,g' conf/httpd.conf \
#   && sed -i 's,\(Listen\) 80,\1 ${PORT},g' conf/httpd.conf \
#   && echo 'SSLProxyEngine on' >> conf/httpd.conf \
#   && echo 'ProxyRequests off' >> conf/httpd.conf \
#   && echo 'ProxyPass /api ${BUS_API_URL}/api interpolate' >> conf/httpd.conf
EXPOSE $PORT
CMD /bin/sh -c "envsubst '\$PORT \$BUS_API_URL' < /etc/nginx/conf.d/server.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"