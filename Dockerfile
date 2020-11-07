FROM node:latest
WORKDIR /var/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "/usr/local/bin/npm", "run", "entrypoint" ]