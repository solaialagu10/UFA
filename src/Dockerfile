FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY image-app/ ./image-app/
RUN cd image-app && npm install && npm run build

EXPOSE 3080

CMD ["node", "./api/server.js"]