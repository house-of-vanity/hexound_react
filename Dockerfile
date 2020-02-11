FROM ubuntu:18.04


ENV HOSTNAME=dev_hexound.hexor.ru
RUN apt update && apt install -y python3-pip npm && apt-get clean
COPY web /hexound/web/
COPY api /hexound/api/
WORKDIR /hexound/api
RUN pip3 install -r requirements.txt
WORKDIR /hexound/web
RUN find  . -name "define.js" -print -exec sed -i -e "s/localhost/${HOSTNAME}/" {} \;
RUN npm install && npm run build
RUN useradd -rM -s /bin/bash -u 1000 hexound
RUN chown -R hexound /hexound
USER hexound
WORKDIR /hexound
ENTRYPOINT python3 api/app.py

