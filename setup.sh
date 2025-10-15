echo "🔧 Iniciando instalación de dependencias para Technova API..."

# Install npm packages
echo "📦 Ejecutando: npm install"
npm install

# Install NestJS CLI globally
echo "🚀 Instalando NestJS CLI globalmente..."
npm install -g @nestjs/cli

# Install TypeORM and PostgreSQL driver
echo "🗄️ Instalando TypeORM y pg..."
npm install @nestjs/typeorm typeorm pg

# Install ts-node and tsconfig-paths (dev dependencies)
echo "🧪 Instalando ts-node y tsconfig-paths..."
npm install -D ts-node tsconfig-paths

# Install class-validator and class-transformer
echo "✅ Instalando class-validator y class-transformer..."
npm install class-validator class-transformer

# Install mapped-types
echo "🧬 Instalando @nestjs/mapped-types..."
npm install @nestjs/mapped-types

# Install Swagger tools
echo "📘 Instalando Swagger y swagger-ui-express..."
npm install @nestjs/swagger swagger-ui-express

# Install CQRS module
echo "🧠 Instalando @nestjs/cqrs..."
npm install @nestjs/cqrs

# Install config
echo "🔧 Instalando @nestjs/config"
npm install @nestjs/config

# Install passport, jwt, bycript
echo "✅ Instalando @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt"
npm install @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt

# Install bcrypt types
echo "Instalando @types/bcrypt"
npm install -D @types/bcrypt

# Install Event Emitter
echo "Instalando @nestjs/event-emitter"
npm install @nestjs/event-emitter

# Install nodemailer
echo "@nestjs-modules/mailer nodemailer"
npm install @nestjs-modules/mailer nodemailer
npm install @types/nodemailer

# Install sanitize-html
echo "Instalando sanitize-html"
npm install sanitize-html

# Install Jest and testing libraries
echo "🧪 Instalando Jest y librerías de testing..."
npm install --save-dev jest @types/jest ts-jest

# Install Sqlite3
echo "🗄️ Instalando sqlite3..."
npm install sqlite3

echo "🎉 Instalación completa. Tu entorno está listo para construir la Technova API."
