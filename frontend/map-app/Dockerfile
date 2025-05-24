FROM node:18-alpine
WORKDIR /frontend/map-app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000