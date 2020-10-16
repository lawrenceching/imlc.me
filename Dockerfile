FROM alpine/git:latest as git

WORKDIR /tmp
RUN git clone https://github.com/lawrenceching/gitbook.git
RUN mkdir -p /tmp/dist
RUN cp -r /tmp/gitbook/* /tmp/dist
RUN cd /tmp/gitbook && git checkout zh-cn
RUN mkdir -p /tmp/dist/v/zh-cn
RUN cp -r /tmp/gitbook/* /tmp/dist/v/zh-cn

FROM node:latest as node
WORKDIR /tmp
COPY package*.json ./
RUN npm install

COPY . .
RUN ls -l
COPY --from=git /tmp/dist /tmp/src/posts
RUN npm run build


FROM caddy:latest

COPY --from=node /tmp/public /srv

ENTRYPOINT [ "caddy", "file-server"]