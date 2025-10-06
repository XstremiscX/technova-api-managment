# Technova API Management

## 🧠 Overview

Technova is a modular, scalable and secure RESTful API designed to manage users, products, sales and purchases. It includes authentication via JWT, email verification, and invoice generation. Built with NestJS, TypeORM and Domain-Driven Design principles.

## 🚀 Features

### 👤 Users
- Login and JWT authentication
- User creation and profile updates
- Password change and email verification
- Soft deletion of accounts

### 📦 Products
- Seller product creation, update and soft deletion
- Public product listing with filters (brand, category, price range)

### 💰 Sales
- Purchase creation and invoice generation
- Buyer and seller views of sales history

## 🧱 Architecture

This project follows clean architecture principles and advanced design patterns:

- **Domain-Driven Design (DDD)**: Clear separation between domain logic, infrastructure and presentation.
- **CQRS (Command Query Responsibility Segregation)**: Read and write operations are handled independently.
- **Repository Pattern**: Abstracts persistence logic from business rules.
- **Mapper Pattern**: Transforms data between entities, domain models and DTOs.
- **Validation Layer**: DTOs with class-validator and sanitization against XSS.
- **Soft Delete Pattern**: Logical deletion using status flags.
- **Authentication & Authorization**: Role-based access control with guards and decorators.

You can explore the full project structure [here](https://github.com/XstremiscX/technova-api-managment/blob/master/documentation/project-structure.md).

## Api Documentation

For full documentation [Swagger UI Documentation](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/XstremiscX/technova-api-managment/refs/heads/master/documentation/openApi.json).

## ⚙️ Installation

Clone the repository:


To install the API correctly on your local machine, you must clone this repository:

```bash
git clone https://github.com/XstremiscX/technova-api-managment.git
```

Next, install all dependencies. You can find how to install them here [Dependencies installation](https://github.com/XstremiscX/technova-api-managment/blob/master/documentation/dependencies-installation.md).

Next, configure the database tables and TypeORM. You can see how to do this here [Database and ORM configuration](https://github.com/XstremiscX/technova-api-managment/blob/master/documentation/database-and-orm-configuration.md)


## Usage

To execute the API, simply run the following statement:

#### development

```bash
npm run start:dev
```

## 🔐 Environment Configuratio

Create a .env file with the following variables

```bash
PORT="Port number"
DB_HOST="Db host"
DB_PORT="Db listening port"
DB_USERNAME="Db user name"
DB_PASSWORD="Db password"
DB_NAME="Db name"
JWT_SECRET="JWT secret"
HOST_NODEMAILER="Nodmailer host "
USER_EMAIL="User email for nodmailer"
EMAIL_APP_PASSWORD="App password email"
```

## License

This project is licensed under the MIT License.

## Contact

GitHub: [XstremiscX](https://github.com/XstremiscX)
Email: [josecarva16@gmail.com]
