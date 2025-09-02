# Technova API Managment

## Overview
This project is a Restful API designed for managing users, products, sales and purchases, handling logins and authentication with JWT, and automated email delivery.

## Features

1. Users: login management, user creation, partial deletion, data update, password update, email verification.
2. Products: Creation, partial deletion, data update, product listing
3. Sales: Creation of purchases/sales, creation of invoices

If you want to see what the project structure looks like, you can view it there [Project Structure](https://github.com/XstremiscX/technova-api-managment/blob/master/documentation/project-structure.md)

## Installation

To install the API correctly on your local machine, you must clone this repository:

```bash
git clone https://github.com/XstremiscX/technova-api-managment.git
```

Next, install all dependencies. You can find which dependencies are used and how to install them here [Dependencies installation](https://github.com/XstremiscX/technova-api-managment/blob/master/documentation/dependencies-installation.md).

Or execute this setup file [Setup](https://github.com/XstremiscX/technova-api-managment/blob/master/setup.sh).

Next, configure the database tables and TypeORM. You can see how to do this here [Database and ORM configuration](https://github.com/XstremiscX/technova-api-managment/blob/master/documentation/database-and-orm-configuration.md)


## Usage

To execute the API, simply run the following statement:

#### development

```bash
npm run start:dev
```

## Configuration

### .env

```bash
PORT="port number"
```

## License

This project is licensed under the MIT License.

## Contact

GitHub: [XstremiscX](https://github.com/XstremiscX)
Email: [josecarva16@gmail.com]
