FROM node:18
WORKDIR /backend
COPY package*.json ./
RUN npm install -g nodemon && npm install
COPY src/ .
EXPOSE 3000
CMD ["npm", "run", "dev"]