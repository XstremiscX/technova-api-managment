# Project Organization

## Designs Patterns:

- Dependency Injection (DI)
- Repository Pattern
- CQRS (Command Query Responsibility Segregation)
- Domain-Driven Design (DDD)
- Mapper Pattern
- Validation Layer
- Exception Handling Pattern
- Authentication & Authorization Pattern
- Soft Delete Pattern


## Archives Structure

```
|--documentation/                       Folder containing project documentation.
|--src/                                 Folder containing all API code.
|   |--app/                             Folder containing the separation of domains and common files.
|   |   |--brands/                      Folder containing all the code necessary for the operation of the Brand domain.
|   |   |   |--application/             Handles orchestration of business use cases and application logic.
|   |   |   |   |--commands/            Contains write operations (e.g. create, update, delete).
|   |   |   |   |--handlers/            Executes commands and queries; connects them to services.
|   |   |   |   |--queries/             Contains read operations (e.g. fetch by ID, list).
|   |   |   |--domain/                  Represents the core business logic and rules, independent of frameworks or infrastructure.
|   |   |   |   |--entities/            Defines domain models with properties and behaviors.
|   |   |   |   |--interfaces/          Declares contracts (e.g. repository interfaces, service interfaces).
|   |   |   |--infrastructure/          Implements technical details and external integrations (e.g. database, APIs).
|   |   |   |   |--modules/             Registers dependencies and configurations for the domain (e.g. controllers, providers).
|   |   |   |   |--repositories/        Implements domain repository interfaces using ORM or raw queries.
|   |   |   |   |--services/            Implements domain service interfaces with external dependencies.
|   |   |   |--presentation/            Manages input/output layers like HTTP controllers and data transfer objects.
|   |   |   |   |--controllers/         Defines API endpoints and routes.
|   |   |   |   |--dtos/                Structures incoming and outgoing data with validation.
|   |   |   |   |--mappers/             Transforms data between domain models, entities, and DTOs.
|   |   |--categories/                  Folder containing all the code necessary for the operation of the Categories domain.
|   |   |--seller-products/             Folder containing all the code necessary for the operation of the Seller Products domain.
|   |   |--public-products/             Folder containing all the code necessary for the operation of the Public Products domain.
|   |   |--sales/                       Folder containing all the code necessary for the operation of the Sales domain.
|   |   |--users/                       Folder containing all the code necessary for the operation of the Users domain.
|   |   |--auth/                        Folder containing all the code necessary for the operation of the Authentication domain.
|   |   |--commons/                     Contains shared infrastructure and utilities used across multiple domains. It promotes reusability, consistency, and centralized configuration.
|   |   |   |--database/                Folder containing database migrations and TypeORM configurations.
|   |   |   |   |--database.module.ts   Centralized configuration for the ORM.
|   |   |   |   |--migrations/          Contains database migration files for schema versioning and deployment.
|   |   |   |--domain/                  Shared domain models and logic used across multiple modules.
|   |   |   |--dtos/                    Shared data transfer objects reused across modules.
|   |   |   |--interfaces/              Houses shared TypeScript interfaces used across domains (e.g. PaginatedResult, JwtPayload, BaseRepository).
|   |   |   |--utils/                   Contains helper functions and reusable utilities (e.g. date formatting, string manipulation, error builders).
|   |   |   |--error-management/        Defines global exception filters, custom error classes, and error handling logic.
|   |   |   |--mappers/                 Shared mappers used across multiple domains.
|   |   |   |--pipes/                   Contains custom pipes for data transformation and sanitization (e.g. XSS protection).
|   |   |   |--services/                Shared services used across domains (e.g. email, logging, caching).
|--test/                                Folder containing all the project's testing files.
```