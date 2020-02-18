FROM alpine
MAINTAINER ultradesu@hexor.ru

ENV URL=dev_hexound.hexor.ru
ENV SCHEME=https
ENV PORT=443

RUN apk add --update python3 npm && rm -rf /var/cache/apk/*
COPY web /hexound/web/
COPY api /hexound/api/
WORKDIR /hexound/api
RUN pip3 install -r requirements.txt
WORKDIR /hexound/web
RUN find  . -name "define.js" -print -exec sed -i -e "s/localhost/${URL}/" -e "s/http/https/" -e "s/5000/443/" {} \;
RUN npm install && npm run build
RUN adduser -S hexound
RUN chown -R hexound /hexound
USER hexound
WORKDIR /hexound
ENTRYPOINT python3 api/app.py

