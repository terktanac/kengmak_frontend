FROM node:10

WORKDIR /kengmak_front
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package*.json /kengmak_front/
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","start" ]