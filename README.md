# KOK:on – Frontend

## Before you start

At the moment, our IDEs of choice are JetBrains tools, i.e. WebStorm and family. If you plan to do development in some
other editor (namely, VS Code, Vim, whatever), please make sure you're able to follow the code formatting etc. in the
same way as everybody else.

### Configure Git and line endings

```shell
git config --local core.autocrlf input
```
The LF is our line ending of choice. Be sure to set

1. Go **Settings…** » **Editor** » **Code Style** and select `Unix and macOS (\n)` as Line separator.

### Install Node 16.x

Please use `lts/gallium`. Install `yarn` 1.x for this version. Then run
```shell
yarn
```
to install project dependencies.

### Configure Prettier

1. Go **Settings…** » **Plugins** and search for Prettier plugin. Install it.
2. Go **Settings…** » **Languages & Frameworks** » **JavaScript** » **Prettier**.
3. Choose Prettier plugin path from the dropdown.
4. Set "Run for files" to `{**/*,*}.{js,ts,jsx,tsx,json,css,scss,sass}`
5. Check both **On Reformat Code action** and **On Save** checkboxes.
6. Go **Settings…** » **Languages & Frameworks** » **TypeScript** » **TSLint** » and select *Automatic TSLint configuration*.

### Install Webstorm plugins

- OpenAPI specifications
- i18n support

### Add access to Font Awesome Pro icons

```shell
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" ????????-????-????-????-????????????
```

Ask for **_authToken** value on *#frontend* channel of the project's Discord.

## Development

1. Assign yourself to the task.
2. Create a branch (`fr-123-some-name`) and a pull request against `staging` when complete.
3. See a job you can do, but no task? Let's discuss it on Discord *#frontend* channel.
4. In commits try not to describe what have you done, but rather _why_ have you done that and what is the outcome /
   improvement / fix.

### Keep these in mind

1. Favor readability over conciseness of code
2. No dirty hacks unless absolutely necessary. Discuss them first.
3. Pass pure strings only to `t()`. No variables, no constants (unless there's a good reason)

## How to run

### Configure API path

Create `.env.local` (have a look at `.env` file for template). Set up the following

For development purposes you should mock API responses by setting:

```shell
REACT_APP_KOKON_API_USE_MOCKS=true
```

### Run project

```shell
yarn
yarn start
```

### Production-like build

Create `.env.production.local` and set values as suggested by backend team. Then:

```shell
yarn build
```
## Cypress Sanity Tests

UI sanity tests are located in `cypress/integration` directory

### How to run

Build the app first and then run the tests:
```shell
yarn run cypress
```

### Skipping failing tests

Most of the selectors are text-based and are prone to failure on UI change.
If a tests fails due to change in the UI / selectors you can skip it by modifying the `*.spec.js` file in `cypress/integration` and adding `skip` attribute to `it()`.
```javascript
it.skip('Failing test', () => {})
```

### Run tests locally
In order to run the tests locally you will need to add values for `REACT_APP_GOOGLE_CLIENTID`, `REACT_APP_GOOGLE_CLIENT_SECRET` and `GOOGLE_REFRESH_TOKEN` in your local `.env` file.
Ask for them on `#frontend` in Slack or [obtain them yourself](https://docs.cypress.io/guides/testing-strategies/google-authentication#Using-the-Google-OAuth-2-0-Playground-to-Create-Testing-Credentials)
