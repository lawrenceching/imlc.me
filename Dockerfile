FROM node:latest
WORKDIR /var/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn
COPY . .
EXPOSE 9000
CMD [ "/usr/local/bin/npm", "run", "entrypoint" ]