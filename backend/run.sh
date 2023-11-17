#!/bin/bash

export DB_NAME=sca
export DB_USER=root
export DB_PASSWORD=root
export JWT_SECRET_KEY="Xn1%tJ6O3K4%^6#rOr3npJ5cmel^48H11o7NnGy5SxY!8nUkzh!ZIOvl0^5J6#ZhQv6$GibovDYBAC@4gmSKg%&&hzQW!NTnCRSIL4AWprRuXmWbZ$xuP6h%OSVgf0Fp"
export PORT=3000

node ./swagger/swagger.js
npx nodemon ./src/server.js