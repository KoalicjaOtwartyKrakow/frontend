# Ukraine - database

## How to run

### Configure API path

Set API path in `.env.local` (create it first, have a look at `.env` file for template).
For development purposes you can mock API responses by setting:
```shell
REACT_APP_APARTMENTS_API_USE_MOCKS=true
```

### Run project

```shell
yarn
yarn start
```

### Production-like build

Create `.env.production.local` and set these values:

```shell
REACT_APP_APARTMENTS_ROUTER_BASENAME=/ukraina/
REACT_APP_APARTMENTS_API_USE_MOCKS=false
```
And then:
```shell
yarn build
```

Obviously `/ukraina/` should point to whatever directory you plan to serve as your base url.
Build is created in `./build` directory.