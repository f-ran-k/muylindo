<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Crypto Currency](#crypto-currency)
  - [About](#about)
  - [Project Setup](#project-setup)
    - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
    - [Compile and Minify for Production](#compile-and-minify-for-production)
    - [Run Unit Tests with Vitest](#run-unit-tests-with-vitest)
    - [Lint with ESLint](#lint-with-eslint)
  - [Usage](#usage)
  - [Data](#data)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Crypto Currency


## About

This project originated from a job interview.

It displays information about the Crypto currencies **Bitcoin** and **Ethereum** including current and past **courses**, a **price history** and a basic **chart**.

It is build with [Vue.js](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/) within a week (and another one for refactoring).

A live version is deployed on [Netlify](https://www.netlify.com/). If you want to take a look, please follow [this link](https://muylindo.netlify.app/).

The Code is hosted on [GitHub](https://github.com/f-ran-k/muylindo) and is open source.

<hr />

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

<hr />

## Usage

The upper switches - **Bitcoin** and **Ethereum** - in the Control panel to the left serve as masters.

If both are disabled, this info is displayed and all other switches are disabled as well.

Toggle either of it or both to display the single currency courses and enable the other switches.<br />
Toggle either of the latter in turn to display the appropriate data.

## Data

The Data displayed is provided by **CoinGecko**. If you are intrested, take a look at their [API Playground](https://docs.coingecko.com/reference).<br />

The following Rules apply when selecting a date from the **Date Picker**:<br />

- 1 day from current time = 5 minute interval data
- 1 - 90 days from current time = hourly data
- above 90 days from current time = daily data
