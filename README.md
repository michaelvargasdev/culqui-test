<!--
title: 'Serverless Nodejs Rest API with TypeScript And MongoDB Atlas'
description: 'This is simple REST API example for AWS Lambda By Serverless framwork with TypeScript and MongoDB Atlas.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
priority: 10
authorLink: 'https://github.com/michaelvargasdev'
authorName: 'Michael Vargas'
-->
# Serverless Nodejs Rest API with TypeScript And MongoDB Atlas

This is simple REST API example for AWS Lambda By Serverless framwork with TypeScript and MongoDB Atlas.

## Use Cases

* REST API with typescript
* MongoDB Atlas data storage
* Multi-environment management under Serverless
* Unit Test with jest an cucumber BDD and coverage
* Code evaluation with sonarqube

## Deploy

### To Test It Locally

* Run ```npm install``` to install all the necessary dependencies.
* Run ```npm run start``` use serverless offline to test locally. 

### Deploy on AWS, simply run:

```
$ npm run deploy

# or

$ serverless deploy
```

The expected result should be similar to:

```
Compiling with Typescript...
Using local tsconfig.json - tsconfig.json
Typescript compiled.
Watching typescript files...

Starting Offline at stage dev (us-east-2)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * generateToken: culqui-technical-test-dev-generateToken
           * getCard: culqui-technical-test-dev-getCard
endpoints:
   |   POST | http://localhost:3000/dev/card/generateToken                           │
   │   POST | http://localhost:3000/2015-03-31/functions/generateToken/invocations   │
   │   GET  | http://localhost:3000/dev/card/{token}                                 │
   │   POST | http://localhost:3000/2015-03-31/functions/getCard/invocations         |
```

## Usage

send an HTTP request directly to the endpoint using a tool like curl

```
curl https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/card/generateToken
curl https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/card/{token}
```
