FROM alpine/git:latest as git
WORKDIR /tmp
RUN git clone https://github.com/lawrenceching/gitbook.git
RUN ls -l /tmp/gitbook/.gitbook

FROM caddy:latest

COPY --from=git /tmp/gitbook/.gitbook /srv/.gitbook
COPY public /srv
RUN ls -l /srv

ENTRYPOINT [ "caddy", "file-server"]