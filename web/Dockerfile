FROM node:18

COPY . /hexound/web/
WORKDIR /hexound/web

RUN npm i
RUN npm run build

RUN npm install -g serve
ENTRYPOINT serve -s build
