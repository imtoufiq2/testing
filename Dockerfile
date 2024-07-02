FROM node:18-alpine

WORKDIR /react-app/

# COPY public/ /react-app/public

# COPY src/ /react-app/src

# COPY package.json /react-app/

# COPY .env /react-app/
COPY  . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
