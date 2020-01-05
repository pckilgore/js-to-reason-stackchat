# StackChat - Convert a javascript app to ReasonML

## Database Setup

The application expects a postgres database provided by the environment at `process.env.DATABASE_URL` or at 'postgres://localhost:5432/stackchat'

It also expects that database to trust localhost connections from the current user.

## Application Setup

- `yarn install`
- `yarn run seed`
- `yarn start`

The `start` command will run both the `webpack` process (in watch mode) to build you client-side javascript files, and the Node process for your server with `nodemon`.

## Client

You can access the client at `http://localhost:8080/`
