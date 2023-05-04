# API - Rural Producers

## Table of Content

- [General Description](#general-description)
- [Business Requirements](#business-requirements)
- [Technologies](#technologies)
- [Running the Project](#running-the-project)
- [API Docs (Swagger)](#api-docs-swagger)
- [API Routes](#api-routes)
- [API Collection (Postman)](#api-collection-postman)

## General Description

The main objective of this API is to provide a way of registering brazilian rural producers through the following data:

1.  CPF or CNPJ
2.  Producer name
3.  Farm name
4.  City
5.  State
6.  Farm total area in hectares
7.  Farm arable area in hectares
8.  Farm vegetation area in hectares
9.  Crops planted (soybean, corn, cotton, coffee, sugar cane)

## Business Requirements

- The user should be able to create, read, update and delete rural producers.
- The system should validate the documents of the user (CPF and CNPJ).
- The sum of the arable and vegetation area should not be greater than the farm's total area.
- Each producer can plant more than one crop on his farm.
- There must be an endpoint that returns:
  - Total number of farms (quantity)
  - Total area of all farms.
  - Total number of farms by state.
  - Total number of farms by crop.
  - Total number of farms by land use (arable and vegetation area)

## Technologies

For this application I used the [NestJS](https://docs.nestjs.com/) framework that helps on the creation of server-side applications like this. I used a lot of interesting tools that the framework offers, where if I had to create by hand, I would take much more time and effort, besides the fact that developers have to do these kinds of things in every new project.

I used some good features from this framework, like the decorators that helped me in the definitions of the modules, controllers and routes. I also used the integration of the framework with another libs like the **class-validator** for data validation (in the request body or other places in the code) or the **TypeORM** which maps relational database data to Javascript objects.

The chosen database was the PostgreSQL, which was configured to run through Docker Compose in a container and also has an easy way of integration with the services classes through the Nest dependency injection mechanism.

## Running the Project

Before running the project, its necessary to run the command `docker-compose up -d` to set up the database (you will need Docker and Docker Compose installed).

After that, duplicate the `.env.example` file and rename it to `.env`.

Then run the command `npm run start` and then you can start making requests to the API.

## API Docs (Swagger)

The initial version of the Swagger API docs is available in the following route: `/producers/dashboard`.

## API Routes

- producers
  - POST /producers
  - GET /producers[?name=producer-name]
  - GET /producers/:id
  - PATCH /producers/:id
  - DELETE /producers/:id
  - GET /producers/dashboard

## API Collection (Postman)

A Postman Collection is available in this repo on the _docs_ folder.
