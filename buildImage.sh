#!/bin/bash

container_name="sca-backend"
dockerhub_repo="123pedrosilva123/sca-backend"
version=$(cat ./backend/package.json | grep "\"version\"" | awk -F: '{print $2}' | sed 's/[", ]//g')


docker build -t ${container_name} .
docker tag ${container_name} ${dockerhub_repo}:${version}
docker tag ${container_name} ${dockerhub_repo}:latest

docker login

docker push ${dockerhub_repo}:${version}
docker push ${dockerhub_repo}:latest

echo "Imagens enviadas para o Docker Hub com sucesso!"
