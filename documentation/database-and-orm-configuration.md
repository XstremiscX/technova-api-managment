# Database Configuration

First, you must create a database with PostgreSQL, either through a database manager such as pgAdmin or another method.

Then, you must configure the environment(.env) data:

1. DB_PORT="Port where the database listens"
2. DB_HOST="Database host"
3. DB_USERNAME="Database user"
4. DB_PASSWORD="Database user password"
5. DB_DATABASE="Database name"

Then you must execute this command(Replace the InitialScheme with whatever scheme you want. ):

```bash
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/app/commons/database/migrations/InitialSchema -d src/app/commons/database/datasource.ts
```

Once the migration is generated, you must go to the datasource, import the newly created migration, and replace it within the datasource file in migrations: []

After replacing the file in mirations:[], you must run the following command:

```bash
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/app/commons/database/datasource.ts
```
