# Pomagam Ukrainie – Frontend

## Development

1. Try not to commit directly to `main`. It's not yet strictly enforced, but as the team grows larger we'll probably need to introduce this change. For now, let's just make this a mutual agreement. Urgent fixes might skip this pipeline.
2. Assign yourself to the task.
3. Create a branch (`task-123-some-name`) and a pull request when complete.
4. Accepted PRs land in `main`.
5. See a job you can do, but no task? Let's discuss it on Discord *#frontend* channel.
6. In commits try not to describe what have you done, but rather _why_ have you done that and what is the outcome / improvement / fix.

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