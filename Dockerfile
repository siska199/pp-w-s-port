FROM node:20-alpine
WORKDIR /kyuuchan-199/app-s-port-client
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev-expose"]