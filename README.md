## Description

API created for JalaSoft Dev Test on 11-18-2023. With this API it is possible to handle tasks like create, read, update and delete.

## Installation

If you have DOCKER, you can use the docker-compose.yml file to compose up the 2 services (todo-list api and db) and you will be able to run the project. Otherwise, you can run the project as follows:

Before proceed you need to install dependencies:

```bash
$ yarn install
```

To run this project you can create a database or compose up a postgres container using the docker-compose.yml file on root of this project.

Remember to check the .env.example to see the required enviroment variables.

## Running the app

```bash
# development
$ yarn start 
```
```bash
# development watch mode
$ yarn start:dev 
```
