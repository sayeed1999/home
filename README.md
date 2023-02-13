# HOME

The monorepo project will contain all microservices for the `Home` project which will have everything needed as independent services deployable via docker kubernetes! In sha Allah

## OVERALL STRUCTURE

```
./api-gateway
  # the central service that client app will communicate with called the api gateway!!
  # runs on localhost:4000

./auth-service
  # microservice for user authentication & authorization
  # runs on localhost:4001
  # server dependency: mysql

./chat-service
  # microservice for messenger-like chatting
  # runs on localhost:4005
  # server dependency: mongodb

./ecom-service
  # microservice for e-commerce or marketplace
  # runs on localhost:4004
  # server dependency: mysql

./email-service
  # microservice for mailing tasks
  # runs on localhost:4003
  # server dependency: nodemailer, mailtrap

./home-service
  # microservice for the virtual home where people will gather to share emotions & thoughts..
  # runs on localhost:4002
  # server dependency: mongodb
```

## How to run the project

You can run each microservice independently by `npm start` command.

## EACH SERVICE FOLDER STRUCTURE

#### Each module inside ./modules dir will follow "Onion architecture" which says controller layer shall hold request-response processing, service layer shall hold businesses and repository layer shall hold database queries. This way, one layer will be topped over the other layer like a sandwitch!

```
src
│ app.js # App entry point
└─── api # Express route controllers for all the endpoints of the app
└───── routes
└───── middlewares
└─── config # Environment variables and configuration related stuff
└─── jobs # Jobs definitions for agenda.js
└─── loaders # Split the startup process into modules
└─── models # Database models
└─── modules
└───── base
└─────── controller
└─────── service
└─────── repository
└───── <module>
└─────── controller
└─────── service
└─────── repository
└─── subscribers # Event handlers for async task
└─── types # Type declaration files (d.ts) for Typescript
└─── utils
└───── constants
└───── helpers
```

## Available endpoints through API Gateway

#### Endpoints for accessing auth-service

Register an account:-

```
POST /auth/register
body
{
  "name": "Md. Sayeed Rahman",
  "email": "test@gmail.com",
  "password": "123456Aa$"
}
```

Login an account:-

```
POST /auth/login
body
{
  "email": "test50@gmail.com",
  "password": "123456Aa$"
}
```

Get current user:-

```
GET /auth/current-user
header: Authorization
```

Update current user:-

```
PATCH /auth/current-user
header: Authorization
```

Delete current user:-

```
DELETE /auth/current-user
header: Authorization
```
