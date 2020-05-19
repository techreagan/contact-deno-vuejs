# Contact List - Deno

> This is a contact list app built with denojs, oak, servestjs, vuejs & mongodb.

## Features

> CRUD (Create, Read, Update And Delete)

- CRUD operation for contacts

## API Documentation

Extensive and testing documentation with postman: [Contact list API](https://documenter.getpostman.com/view/9407876/SzmmUEYg?version=latest)

## Database Model

Though the diagram uses sql data type, this diagram is to show you the various collections in the mongo database.

![Screenshot](contact-ERD.jpg)

## Requirement

- DenoJS
- MongoDB

## Installation

Install deno [installation](https://deno.land/manual/getting_started/installation)

Install denon it's like nodemon

```console
deno install -Af --unstable https://deno.land/x/denon/denon.ts
```

## Frontend - client folder

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Backend

I developed the API with two deno framework servestjs and oak, pick anyone to start the server.

> **Disclaimer!!**: I'm having issues with cors with servestjs, so just use the oak server with the frontend!

### Start oak server

```console
cd server-oak
```

```console
denon app.ts
```

### Start servestjs server

```console
cd server-servest
```

```console
denon app.ts
```

## Check more on oak

[Documentation](https://github.com/oakserver/oak)

## Check more on servestjs

[Documentation](https://servestjs.org/)

## License

This project is licensed under the MIT License

## Developed by Reagan Ekhameye (Tech Reagan)

Reach me on twitter [@techreagan](https://www.twitter.com/techreagan)
