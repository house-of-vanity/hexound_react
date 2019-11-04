FROM ubuntu:18.04

RUN apt update && apt install -y python3-pip npm && apt-get clean
COPY . /hexound
WORKDIR /hexound
RUN pip3 install -r requirements.txt
WORKDIR /hexound/web
RUN npm install && npm run build
RUN useradd -rM -s /bin/bash -u 1000 hexound
WORKDIR /hexound
ENTRYPOINT python3 app.py
RUN chown -R hexound /hexound
USER hexound

