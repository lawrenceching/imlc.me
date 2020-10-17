FROM alpine/git:latest as git

WORKDIR /tmp
RUN git clone https://github.com/lawrenceching/gitbook.git
RUN mkdir -p /tmp/dist
RUN cp -r /tmp/gitbook/.gitbook /tmp/dist/.gitbook
RUN cd /tmp/gitbook && git checkout zh-cn
RUN mkdir -p /tmp/dist/v/zh-cn
RUN cp -r /tmp/gitbook/.gitbook /tmp/dist/v/zh-cn/.gitbook

FROM node:latest as node
WORKDIR /tmp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM caddy:latest

COPY --from=git /tmp/dist/.gitbook /srv/.gitbook
COPY --from=git /tmp/dist/v/zh-cn/.gitbook /srv/v/zh-cn/.gitbook
COPY --from=node /tmp/public /srv
RUN ls -l /srv

ENTRYPOINT [ "caddy", "file-server"]