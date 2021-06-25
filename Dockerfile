FROM node:12.18-alpine
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --dev --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
