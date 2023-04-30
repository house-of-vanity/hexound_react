FROM alpine:3
MAINTAINER ultradesu@hexor.ru

ENV URL=dev_hexound.hexor.ru
ENV SCHEME=https
ENV PORT=443

RUN apk add --update --no-cache python3 npm

COPY api /hexound/api/
WORKDIR /hexound/api
RUN apk add py3-pip
RUN pip3 install -r requirements.txt
# RUN find  . -name "define.js" -print -exec sed -i -e "s/localhost/${URL}/" -e "s/http/https/" -e "s/5000/443/" {} \;
RUN adduser -S hexound
RUN chown -R hexound /hexound
USER hexound
WORKDIR /hexound
ENTRYPOINT python3 api/app.py

