# Scripts de Despliegue para University API

Este documento describe los scripts de despliegue disponibles para la API de gestión universitaria, diseñados para facilitar el proceso de configuración y despliegue en diferentes entornos, incluyendo Vercel.

## Scripts Disponibles

Se han creado varios scripts para automatizar el proceso de despliegue con diferentes tipos de bases de datos:

### Scripts Generales

- `npm run deploy`: Script interactivo que permite seleccionar el tipo de base de datos a utilizar.

### Scripts Específicos por Base de Datos

- `npm run deploy:sqlite`: Configura y despliega la aplicación con SQLite.
- `npm run deploy:postgresql`: Configura y despliega la aplicación con PostgreSQL.
- `npm run deploy:mysql`: Configura y despliega la aplicación con MySQL.
- `npm run deploy:sqlserver`: Configura y despliega la aplicación con SQL Server.

### Scripts para Vercel

- `npm run vercel-deploy`: Script automático para despliegue en Vercel que detecta el tipo de base de datos basado en las variables de entorno disponibles.
- `npm run vercel-build`: Script utilizado por Vercel durante el proceso de construcción.

## Proceso de Despliegue

Cada script de despliegue realiza las siguientes acciones:

1. **Configuración de la base de datos**: Selecciona y configura el esquema Prisma adecuado para el tipo de base de datos elegido.
2. **Instalación de dependencias**: Instala todas las dependencias necesarias.
3. **Generación del cliente Prisma**: Genera el cliente Prisma basado en el esquema seleccionado.
4. **Ejecución de migraciones**: Aplica las migraciones necesarias a la base de datos.
5. **Población de datos iniciales**: Ejecuta el script de seed para poblar la base de datos con datos iniciales (opcional en Vercel).
6. **Compilación de la aplicación**: Compila la aplicación para producción.
7. **Copia de archivos necesarios**: Copia los archivos necesarios para el despliegue.

## Configuración para Vercel

Para desplegar en Vercel, sigue estos pasos:

1. Configura las variables de entorno necesarias en el panel de Vercel:
   - `DATABASE_URL_POSTGRESQL`, `DATABASE_URL_MYSQL`, `DATABASE_URL_SQLSERVER` o `DATABASE_URL_SQLITE` según el tipo de base de datos que desees utilizar.
   - `SEED_DATABASE=true` si deseas poblar la base de datos con datos iniciales (opcional).

2. Configura el comando de construcción en Vercel:
   ```
   npm run vercel-deploy
   ```

3. Asegúrate de que el comando de inicio esté configurado correctamente:
   ```
   npm run start:prod
   ```

## Variables de Entorno Requeridas

Dependiendo del tipo de base de datos seleccionado, deberás configurar las siguientes variables de entorno:

- **SQLite**: `DATABASE_URL_SQLITE`
- **PostgreSQL**: `DATABASE_URL_POSTGRESQL`
- **MySQL**: `DATABASE_URL_MYSQL`
- **SQL Server**: `DATABASE_URL_SQLSERVER`

Además, para el despliegue en Vercel:

- **SEED_DATABASE**: Establece a `true` si deseas poblar la base de datos con datos iniciales.

## Notas Importantes

- El script `vercel-deploy.js` detecta automáticamente el tipo de base de datos basado en las variables de entorno disponibles.
- Si no se detecta ninguna variable de entorno específica, se utilizará PostgreSQL por defecto.
- La población de datos iniciales es opcional en Vercel y se controla mediante la variable de entorno `SEED_DATABASE`.