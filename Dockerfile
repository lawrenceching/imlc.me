FROM alpine/git:latest as git

WORKDIR /tmp
RUN git clone https://github.com/lawrenceching/gitbook.git
RUN mkdir -p /tmp/dist
RUN mkdir -p /tmp/dist/.gitbook
RUN mkdir -p /tmp/dist/.gitbook/assets
RUN cp -r /tmp/gitbook/.gitbook/assets/* /tmp/dist/.gitbook/assets
RUN cd /tmp/gitbook && git checkout zh-cn && git status
RUN ls -all /tmp/gitbook/.gitbook/assets
RUN cp -r /tmp/gitbook/.gitbook/assets/* /tmp/dist/.gitbook/assets

FROM node:latest as node
WORKDIR /tmp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM caddy:latest

COPY --from=git /tmp/dist/.gitbook /srv/.gitbook
COPY --from=node /tmp/public /srv
RUN ls -l /srv/.gitbook/assets

ENTRYPOINT [ "caddy", "file-server"]