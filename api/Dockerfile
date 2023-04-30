FROM alpine:3
MAINTAINER ultradesu@hexor.ru

RUN apk add --update --no-cache python3 npm
COPY . /hexound/api/
WORKDIR /hexound/api
RUN apk add py3-pip
RUN pip3 install -r requirements.txt
RUN adduser -S hexound
RUN chown -R hexound /hexound
USER hexound
WORKDIR /hexound
ENTRYPOINT python3 api/app.py

