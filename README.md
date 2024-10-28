<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
$ yarn run start

# watch mode
$ npm run start:dev
$ yarn run start:dev

# production mode
$ npm run start:prod
$ yarn run start:prod
```

## Overview

The `BilldeskService` is a NestJS service that integrates with the Billdesk payment gateway. It provides functionalities
to create orders, hit the Billdesk API, handle responses, and manage transaction records.

## Dependencies

- `@nestjs/common`: Core NestJS library.
- `@nestjs/config`: Configuration management for NestJS.
- `axios`: Promise-based HTTP client for the browser and Node.js.
- `jws`: JSON Web Signature library for signing and verifying JSON Web Tokens.
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment.
- `@nestjs/mongoose`: Mongoose integration for NestJS.

## Environment Variables

Ensure the following environment variables are set in your application:

- `BILLDESK_SECRET`: Secret key for signing requests.
- `BILLDESK_MERCHANT_NAME`: Name of the merchant.
- `BILLDESK_MERCHANT_ID`: Merchant ID for Billdesk.
- `BILLDESK_CLIENT_ID`: Client ID for Billdesk.
- `BILLDESK_URL`: URL for the Billdesk API.
- `BILLDESK_RU`: Return URL for the payment gateway.

## Methods

### 1. `billdeskApiHit(req: Request, type: string = 'lab_booking')`

- **Description**: Sends a request to the Billdesk API to initiate a payment.
- **Parameters**:
  - `req`: The HTTP request object.
  - `type`: The type of transaction (default is 'lab_booking').
- **Returns**: A promise that resolves to the payment response.

### 2. `createOrder(req: Request, productType: BilldeskProductType, id: Types.ObjectId, amount: number, userId: string)`

- **Description**: Creates a new order with the specified details.
- **Parameters**:
  - `req`: The HTTP request object.
  - `productType`: The type of product being purchased.
  - `id`: The booking ID.
  - `amount`: The amount to be charged.
  - `userId`: The ID of the user making the payment.
- **Returns**: A promise that resolves to the order response.

### 3. `billdeskGetResponse(req: Request)`

- **Description**: Handles the response from the Billdesk payment gateway.
- **Parameters**:
  - `req`: The HTTP request object.
- **Returns**: The parsed response data.

### 4. `list()`

- **Description**: Retrieves all transaction records from the database.
- **Returns**: An object containing the total number of records and the records themselves.

## Usage

To use the `BilldeskService`, inject it into your controller or another service:
