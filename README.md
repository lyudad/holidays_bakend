# ZENBIT NOTES

ORM used is [TypeORM](https://typeorm.io/#/)

DATABASE used is [MySQL2](https://github.com/sidorares/node-mysql2#readme) 
>NB! DATABASE should be installed separately and running at the specified host:port

## ENVIRONMENT 

env variables should be configured in root `.env` file:

```
// app port and running mode: <development | production>
PORT=3030
NODE_ENV=development

// database settings
DB_PORT=3306 
DB_HOST=localhost
DB_USERNAME=admin
DB_PASSWORD=secret
DATABASENAME=zenbit
```


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
