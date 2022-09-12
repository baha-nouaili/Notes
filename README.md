## Description

This project uses the Nestjs framwork along with Mongodb database.
You will need to install the Nodejs runtime and the Mongod deamon into your machine
To be able to run this project.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build && $ npm run start:prod
$
```

## Api documentation

You can access the api documentation by navigating to the localhost:4000/api/docs path.

## Environment Variables

```bash
This project uses variables environments to protect ApiKeys , tokens ...
You need to setup an .env file that conatins this [KEY]=VALUE
PORT=The port that the app will run on
MONGODB_URI= The mongodb uri.
DB_NAME= The DB name
ACCESS_TOKEN_SECRET= A generated secret for the access token.
ACCESS_TOKEN_EXP= The expiration time for the access token.
REFRESH_TOKEN_SECRET=A generated secret for the refresh token.
REFRESH_TOKEN_EXP= The expiration time for the refresh token.


Feel free to use this .env file

PORT=4000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=Notes
ACCESS_TOKEN_SECRET=456a646685256a1bb150783c1d4344a8bdca7eb6cc6eb499aaf8a64d3c806ac8
ACCESS_TOKEN_EXP=3h
REFRESH_TOKEN_SECRET=76fc6b5a918510e218800b818e00b1396e31ba854f0a03799eef8f752f363fd8
REFRESH_TOKEN_EXP=1y


```
