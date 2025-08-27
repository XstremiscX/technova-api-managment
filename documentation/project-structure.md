# Project Organization

## Designs Patterns:

- Controller-Service-Repository Pattern
- Dependency Injection (DI)
- Repository Pattern
- CQRS (Command Query Responsibility Segregation)
- Strategy Pattern
- Factory Pattern
- Event Emitter / Observer Pattern

## Archives Structure

```
|--documentation/                       *Folder containing project documentation.
|--src/                                 *Folder containing all API code.
|   |--app/                             *Folder containing the separation of domains and common files.
|   |   |--brands/                      *Folder containing all the code necessary for the operation of the Brand domain.
|   |   |   |--application/             *Handles orchestration of business use cases and application logic.
|   |   |   |   |--commands/            *Contains write operations (e.g. create, update, delete).
|   |   |   |   |--handlers/            *Executes commands and queries; connects them to services.
|   |   |   |   |--queries/             *Contains read operations (e.g. fetch by ID, list).
|   |   |   |--domain/                  *Represents the core business logic and rules, independent of frameworks or infrastructure.
|   |   |   |   |--entities/            *Defines domain models with properties and behaviors.
|   |   |   |   |--interfaces/          *Declares contracts (e.g. repository interfaces, service interfaces).
|   |   |   |   |--validators/          *Contains business rule validations (e.g. value objects, guards).
|   |   |   |--infrastructure/          *Implements technical details and external integrations (e.g. database, APIs).
|   |   |   |   |--repositories/        *Implements domain repository interfaces using ORM or raw queries.
|   |   |   |   |--services/            *Implements domain service interfaces with external dependencies.
|   |   |   |--presentation/            *Manages input/output layers like HTTP controllers and data transfer objects.
|   |   |   |   |--controllers/         *Defines API endpoints and routes.
|   |   |   |   |--dtos/                *Structures incoming and outgoing data with validation.
|   |   |--categories/                  *Folder containing all the code necessary for the operation of the categories domain.
|   |   |--products/                    *Folder containing all the code necessary for the operation of the products domain.
|   |   |--sales/                       *Folder containing all the code necessary for the operation of the sales domain.
|   |   |--users/                       *Folder containing all the code necessary for the operation of the users domain.
|   |   |--commons/                     *Contains shared infrastructure and utilities used across multiple domains. It promotes reusability, consistency, and centralized configuration.
|   |   |   |--database/                *Folder containing database migrations and TypeORM configurations.
|   |   |   |   |--database.module.ts   *Centralized configuration for the ORM.
|   |   |   |   |--migrations/          *Contains database migration files for schema versioning and deployment.
|   |   |   |--guards/                  *Contains custom NestJS guards (e.g. JwtAuthGuard, RolesGuard) that control access to routes based on authentication or roles.
|   |   |   |--interceptors/            *Defines global or scoped interceptors (e.g. logging, transformation, timeout) that modify request/response behavior.
|   |   |   |--interfaces/              *Houses shared TypeScript interfaces used across domains (e.g. PaginatedResult, JwtPayload, BaseRepository).
|   |   |   |--utils/                   *Contains helper functions and reusable utilities (e.g. date formatting, string manipulation, error builders).
|   |   |   |--error-management/        *Defines global exception filters, custom error classes, and error handling logic.
|--test/                                *Folder containing all the project's testing files.
```