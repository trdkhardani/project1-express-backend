#!/bin/bash

npm init --yes
npm install express prisma cors dotenv
npm install  -D typescript ts-node-dev @types/express @types/cors
npx tsc --init
touch app.ts