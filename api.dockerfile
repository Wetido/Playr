FROM node:14
RUN npm i -g @nestjs/cli
RUN mkdir /app

COPY /api/package.json /app
COPY /api/package-lock.json /app

WORKDIR /app

RUN NODE_ENV=development npm install
COPY /api /app

EXPOSE 5000
CMD ["npm", "start"]



