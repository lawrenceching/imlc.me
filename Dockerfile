FROM alpine/git:latest as git

WORKDIR /tmp
RUN git clone https://github.com/lawrenceching/gitbook.git
RUN mkdir -p /tmp/dist
RUN cp -r /tmp/gitbook/* /tmp/dist
RUN cd /tmp/gitbook && git checkout zh-cn
RUN mkdir -p /tmp/dist/v/zh-cn
RUN cp -r /tmp/gitbook/* /tmp/dist/v/zh-cn
RUN ls -l /tmp/dist

FROM node:latest as node
WORKDIR /tmp
COPY package*.json ./
RUN npm install

COPY . .
COPY --from=git /tmp/dist /tmp/src/post
RUN npm run build
RUN ls -l

FROM caddy:latest

COPY --from=node /tmp/public /srv

ENTRYPOINT [ "caddy", "file-server"]