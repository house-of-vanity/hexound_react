FROM node:16

COPY . /hexound/web/
WORKDIR /hexound/web

RUN npm install
RUN npm run build

RUN npm install -g serve
ENTRYPOINT serve -s build
