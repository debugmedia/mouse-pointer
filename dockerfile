FROM node:14.17.3

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm install --quiet

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]