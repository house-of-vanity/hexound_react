MAINTAINER ultradesu@hexor.ru
FROM ubuntu:18.04

ENV URL=dev_hexound.hexor.ru
ENV SCHEME=https
ENV PORT=443

RUN apt update && apt install -y python3-pip npm && apt-get clean
COPY web /hexound/web/
COPY api /hexound/api/
WORKDIR /hexound/api
RUN pip3 install -r requirements.txt
WORKDIR /hexound/web
RUN find  . -name "define.js" -print -exec sed -i -e "s/localhost/${URL}/" -e "s/http/https/" -e "s/5000/443/" {} \;
RUN npm install && npm run build
RUN useradd -rM -s /bin/bash -u 1000 hexound
RUN chown -R hexound /hexound
USER hexound
WORKDIR /hexound
ENTRYPOINT python3 api/app.py

