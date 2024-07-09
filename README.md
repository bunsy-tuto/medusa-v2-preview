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

### PostgreSQL Database

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
