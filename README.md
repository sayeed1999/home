# HOME

The monorepo project will contain all microservices for the `Home` project which will have everything needed as independent services deployable via docker kubernetes! In sha Allah

## FOLDER STRUCTURE
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
