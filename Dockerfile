# 1. Define the base image on top of which our application will run, Node in this case.
FROM node:18-alpine
# 2. Define the WORKDIR; which is the working directory of the docker container at any given time
WORKDIR /app
# 3. Then we copy our package.json file from our local system to docker image
COPY package.json .
# 4. Then run npm install inside the docker image to install all our dependencies
RUN npm install
# 5.Then we install serve, it helps youserve a static site, single page application or just a static file.
RUN npm i -g serve
# 6. Then copy the rest of the files into the docker image.
COPY . .
# 7. Then run npm run build tocreatea production build of our application 
RUN npm run build
# 8. Then expose to post 3000 
EXPOSE 3000
# 9. RUn only when the container spins up. 
CMD ["serve", "-s", "dist"]