FROM alpine/git:latest as git

WORKDIR /tmp
RUN git clone https://github.com/lawrenceching/gitbook.git
RUN mkdir -p /tmp/dist
RUN cp -r /tmp/gitbook/.gitbook /tmp/dist
RUN cp -r /tmp/gitbook/* /tmp/dist
RUN cd /tmp/gitbook && git checkout zh-cn
RUN mkdir -p /tmp/dist/v/zh-cn
RUN cp -r /tmp/gitbook/* /tmp/dist/v/zh-cn
RUN cp -r /tmp/gitbook/.gitbook /tmp/dist/v/zh-cn/
RUN ls -all /tmp/dist | grep gitbook

FROM node:latest as node
WORKDIR /tmp
COPY package*.json ./
RUN npm install

COPY . .
COPY --from=git /tmp/dist /tmp/src/posts
RUN npm run build


FROM caddy:latest

COPY --from=git /tmp/dist/.gitbook /srv/.gitbook
COPY --from=git /tmp/dist/v/zh-cn/.gitbook /srv/v/zh-cn/.gitbook
COPY --from=node /tmp/public /srv
RUN ls -all /srv | grep gitbook
RUN ls -all /srv/v/zh-cn/
RUN ls -all /srv

ENTRYPOINT [ "caddy", "file-server"]