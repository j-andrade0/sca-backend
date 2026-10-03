#!/bin/bash
# Development runner: loads backend/.env, generates the Swagger file and starts the API with nodemon.
cd "$(dirname "$0")" || exit 1

if [ ! -f .env ]; then
	echo "Missing backend/.env. Run: cp .env.example .env (and edit it)" >&2
	exit 1
fi

set -a
. ./.env
set +a

node ./swagger/swagger.js
npx nodemon ./src/server.js
