# Medusa V2 Preview

## Setup

1. [Install packages](#install-packages)
1. [Start containers in docker-compose](#start-containers-in-docker-compose)
1. [Run migration if it is the first time](#run-migration-if-it-is-the-first-time)
1. [Run seed](#run-seed)
1. [Add admin email](#add-admin-email)
1. [Start development](#start-development)

### Install packages

```shell
yarn install
```

### Start containers in docker-compose

```shell
docker-compose up
```

### Run migration if it is the first time

```shell
npx medusa migrations run
```

### Run seed

```shell
yarn seed
```

### Add admin email

```shell
npx medusa user -e admin@medusa-test.com -p supersecret
```

Use `http://localhost:9000/app` to access the admin dashboard.

### Start development

```shell
yarn dev
```

This command will start docker compose and medusa server and admin dashboard.

- medusa server is accessible at `localhost:9000`
- medusa admin dashboard is accessible at `localhost:9000/app`

## Authentication

### Admin

To login as an admin, you must follow these procedures:

1. [authenticate with email password](#authenticate-with-email-password)
1. [generate session cookie](#generate-session-cookie)
1. [verify your login](#verify-your-login)

#### Authenticate with email password

```shell
curl --location 'http://localhost:9000/auth/user/emailpass' \
--header 'Connection: keep-alive' \
--header 'Origin: http://localhost:9000' \
--header 'accept: application/json' \
--header 'content-type: application/json' \
--data-raw '{
    "email": "admin@medusa-test.com",
    "password": "supersecret"
}'
```

When calling the api, you will get:

- token (denoted as `TOKEN_OF_USER_EMAILPASS_ABOVE`)

If you run it successfully, you will get object like this:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rvcl9pZCI6InVzZXJfMDFKMkQ4QjBWOTVQNVFLQVIyNEtKNzAxNVQiLCJhY3Rvcl90eXBlIjoidXNlciIsImF1dGhfaWRlbnRpdHlfaWQiOiJhdXRoaWRfMDFKMkQ4QjBYWjdINFYwM1BHM0RWMjU2V0IiLCJhcHBfbWV0YWRhdGEiOnsidXNlcl9pZCI6InVzZXJfMDFKMkQ4QjBWOTVQNVFLQVIyNEtKNzAxNVQifSwiaWF0IjoxNzIwNTk5NDU3LCJleHAiOjE3MjA2ODU4NTd9.SL70IsCzxIsWuXxiBsBbuj0o4c7k3Pzclnoa1LHdx9Y"
}
```

#### Generate session cookie

This api needs the api key `TOKEN_OF_USER_EMAILPASS_ABOVE` from the previous api call.

```shell
curl --location --request POST 'http://localhost:9000/auth/session' \
--header 'Connection: keep-alive' \
--header 'Origin: http://localhost:9000' \
--header 'accept: application/json' \
--header 'authorization: Bearer <TOKEN_OF_USER_EMAILPASS_ABOVE>' \
--header 'content-type: application/json' \
```

If you run it successfully, you will get an object like this:

```json
{
  "user": {
    "actor_id": "user_01J2D8B0V95P5QKAR24KJ7015T",
    "actor_type": "user",
    "auth_identity_id": "authid_01J2D8B0XZ7H4V03PG3DV256WB",
    "app_metadata": {
      "user_id": "user_01J2D8B0V95P5QKAR24KJ7015T"
    },
    "iat": 1720599358,
    "exp": 1720685758
  }
}
```

#### Verify your login

You can verify with `admin/users/me`.

```shell
curl --location 'http://localhost:9000/admin/users/me' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
```

If you are successfully authenticated, you will see:

```json
{
  "user": {
    "id": "user_01J2D8B0V95P5QKAR24KJ7015T",
    "first_name": null,
    "last_name": null,
    "email": "admin@medusa-test.com",
    "avatar_url": null,
    "metadata": null,
    "created_at": "2024-07-10T02:42:39.593Z",
    "updated_at": "2024-07-10T02:42:39.593Z",
    "deleted_at": null
  }
}
```

## Known Development Problems

### PostgreSQL database

You can close all the processes that are using PostgreSQL to avoid the following errors:

- `Error response from daemon: driver failed programming external connectivity on endpoint medusa_db (4b9b06d7c1ee2ecdc0c9503dfd698c5fa7fb44987cd06673b63496db013dfe22): Error starting userland proxy: listen tcp4 0.0.0.0:5432: bind: address already in use`
- `Error: Loaders for module PaymentModuleService failed: role "postgres" does not exist`

To find all those processes, use the following command:

```shell
sudo lsof -i :5432
```

To kill those processes, use the following command:

```shell
sudo kill -9 <PID>
```

### Generating migration file

#### Description

When generating the migration file for your module, you can face the following error when running this command:

```shell
npx cross-env MIKRO_ORM_CLI=./src/modules/<YOUR_MODULE>/migrations-config.ts mikro-orm migration:create
```

```shell
SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string
```

Related **MikroORM** Github Issue: [Mikro orm config error key is null#
](https://github.com/mikro-orm/mikro-orm/issues/866#:~:text=template%20and%20reproduction.-,omdxp%20commented%20on%20Jan%2015%2C%202022,Or%20just%20use%20the%20ORM%20env%20var%2C%20which%20is%20MIKRO_ORM_PASSWORD.,-2)

It seems the fix was adding `MIKRO_ORM_PASSWORD` (which is the db password); i.e., `supersecret`.

Alternatively you can add `MIKRO_ORM_PASSWORD` to `.env` and in the `../migrations-config.ts` file load the envs with `loadEnv(process.env.NODE_ENV, process.cwd())`;

#### Solution

Use this command which uses `MIKRO_ORM_PASSWORD`:

```shell
npx cross-env MIKRO_ORM_PASSWORD=supersecret MIKRO_ORM_CLI=./src/modules/hello/migrations-config.ts mikro-orm migration:create;
```

See more in this discord conversation [MedusaV2 Migrations from Custom Modules Models Drop a Big Chunk of Database](https://discord.com/channels/876835651130097704/1259437635995172874)

### DBeaver CC

When you connect to your database and see no database there, you should _tick_ the `show all database option`. For more info, follow this [link](https://stackoverflow.com/questions/54235029/dbeaver-can-only-see-default-postgresql-database-in-connection#:~:text=25-,2024%20solution,-They%20moved%20it).
