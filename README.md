<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 

## Description
This application is an employee management system powered by Nest js API and Firestore database service.
## Step 1: Installation and setup

1.	Clone the repository from [GitHub repository for Nest API](https://github.com/NAVODYA123/nestjs-firebase.git)

2. Run following command to install dependancies

```bash
$ npm install
```

3.	Run command  npm run start to start the server in production mode or run following as necessary

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
````

## Step 2: Getting the service port
1.	Open the browser and get the port on which the service runs (default: 3000)
2.	Swagger documents can be accessed by [localhost:3000/swagger](localhost:3000/swagger)


#### Assumptions:
*	Id cannot be updated by the client
*	Only the email and Id fields are unique 
