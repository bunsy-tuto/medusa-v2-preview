# Medusa V2 Preview

## Setup

1. Install packages

```shell
yarn install
```

2. Start containers in docker-compose:

```shell
docker-compose up
```

3. Run migration if it is the first time:

```shell
npx medusa migrations run
```

4. Run seed:

```shell
yarn seed
```

5. Start development:

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
