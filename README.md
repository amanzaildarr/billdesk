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

## Environment Variables

All environment variables are defined in the `env-example` file. Ensure to create a `.env` file in your root directory and populate it with the necessary environment variables as defined in `env-example`.

## Using MongoDB, S3 Bucket, and SendGrid

### MongoDB
This project uses MongoDB as the database. Ensure you have a MongoDB instance running and configure the connection string in your `.env` file:

```env
DB_URI=mongodb://localhost:27017/your-database-name
```

### S3 Bucket
This project uses AWS S3 for file storage. Configure your AWS credentials and bucket details in your `.env` file:

```env
AWS_ACCESS_KEY=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=your-aws-region
```

### SendGrid
This project uses SendGrid for sending emails. Configure your SendGrid API key in your `.env` file:

```env
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_SENDER_EMAIL=your-email@example.com
```

## API Documentation

Comprehensive documentation for the DrSignet APIs is available at [https://updateapi.drsignet.com/docs](https://updateapi.drsignet.com/docs), providing detailed information and interactive access to all available endpoints, helping developers integrate with the DrSignet platform effectively.

### Key Features
- Secure and efficient authentication
- Comprehensive CRUD operations
- Detailed analytics and reporting

### Contact
For support, please contact our team at [support@drsignet.com](mailto:support@drsignet.com).

### License
This API is licensed under the MIT License. See the [LICENSE](https://github.com/drsignet/license) file for more details.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# billdesk
