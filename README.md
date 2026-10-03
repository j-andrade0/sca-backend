# Sistema de controle de acesso - SCA

**Clone the repository**:

`$ git clone https://github.com/j-andrade0/sca-backend.git`

## SCA - Backend
> The objective of this project is to create an authentication system for the Anápolis Air Base.

## Development Environment

As a prerequisite, you will need to install: MySql, Node(we recommend the latest stable version available), Insomnia (or Postman) to test the API.

> Configuration comes from environment variables: copy `backend/.env.example` to `backend/.env` and edit it (`backend/run.sh` loads it). The server refuses to start without `JWT_SECRET_KEY`.

> The file insomnia-sca.json needs to be imported at Insomnia to access the endpoints


## Installation
```sh
cd backend/
npm install
```

## Running the server
### Development
```sh
cd backend/
npm run dev
```
### Production
```sh
cd backend/
npm run start
```

## How to access Swagger documentation
> Now with the server running, open the browser and go to http://localhost:3000/doc/. 
> There you can find all the endpoints, the params, and all you need to know about the api.


## Security note about old values in the git history

Earlier versions of this repository had a JWT signing key in `backend/run.sh` and `docker-compose.yml`, plus a seed
admin user with a fixed password hash. Those values were demonstration-only, used on a local machine for the 2023
hackathon presentation and never in any other environment. They remain in the git history (it was not rewritten), so
**do not use them anywhere**; configuration is now read from the environment (`backend/.env`, which is gitignored).

## Authors
José Antonio de Andrade - andradejoseantonio0@gmail.com - https://github.com/j-andrade0
