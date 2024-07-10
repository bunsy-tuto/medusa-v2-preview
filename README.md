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
