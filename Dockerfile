FROM node:latest as builder
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn
COPY . .
RUN yarn build

FROM nginx:1.19.9

EXPOSE 80

COPY --from=builder /app/public /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

CMD ["nginx"]