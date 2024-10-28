docker build --no-cache -t s-port-client:v1 .
docker run --name c-port-client -p 5173:5173 -v "$(pwd):/kyuuchan-199/app-s-port-client" -v /kyuuchan-199/app-s-port-client/node_modules s-port-client:v1