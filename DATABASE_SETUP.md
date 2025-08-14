# Configuración de Base de Datos

Este proyecto soporta múltiples tipos de bases de datos: **SQLite**, **PostgreSQL**, **MySQL** y **SQL Server**. Puedes cambiar fácilmente entre diferentes tipos de base de datos usando los scripts proporcionados.

## 🗄️ Tipos de Base de Datos Soportados

- **SQLite** - Base de datos ligera, ideal para desarrollo
- **PostgreSQL** - Base de datos robusta para producción
- **MySQL** - Base de datos popular y ampliamente soportada
- **SQL Server** - Base de datos empresarial de Microsoft

## 🚀 Configuración Rápida

### Opción 1: Configuración Interactiva

```bash
npm run db:config
```

Este comando te mostrará un menú interactivo para seleccionar el tipo de base de datos.

### Opción 2: Configuración Directa

Puedes configurar directamente un tipo específico de base de datos:

```bash
# Para SQLite
npm run db:setup:sqlite

# Para PostgreSQL
npm run db:setup:postgresql

# Para MySQL
npm run db:setup:mysql

# Para SQL Server
npm run db:setup:sqlserver
```

### Opción 3: Solo Configuración (sin migración)

Si solo quieres cambiar el esquema sin ejecutar migraciones:

```bash
# Configurar solo el esquema
npm run db:config:sqlite
npm run db:config:postgresql
npm run db:config:mysql
npm run db:config:sqlserver
```

## 📁 Estructura de Archivos

```
infrastructure/database/prisma/
├── schema.prisma              # Esquema activo (se genera automáticamente)
├── schemas/                   # Plantillas de esquemas
│   ├── schema.sqlite.prisma
│   ├── schema.postgresql.prisma
│   ├── schema.mysql.prisma
│   └── schema.sqlserver.prisma
├── seed.ts                    # Datos de prueba
└── apply-triggers.js          # Triggers de base de datos

scripts/
├── setup-database.js         # Script interactivo
└── setup-database-auto.js     # Script automático
```

## ⚙️ Variables de Entorno

El archivo `.env` contiene las siguientes variables:

```env
# Tipo de base de datos activa
DB_TYPE=sqlite

# URLs de conexión
DATABASE_URL_SQLITE="file:./dev.db"
DATABASE_URL_POSTGRESQL="postgresql://username:password@localhost:5432/university_db"
DATABASE_URL_MYSQL="mysql://username:password@localhost:3306/university_db"
DATABASE_URL_SQLSERVER="sqlserver://localhost:1433;database=university_db;username=sa;password=yourpassword;encrypt=true;trustServerCertificate=true"

# URL activa (se actualiza automáticamente)
DATABASE_URL="file:./dev.db"
```

## 🔧 Configuración Manual

### 1. Editar Variables de Entorno

Actualiza las URLs de conexión en el archivo `.env` según tu configuración:

**PostgreSQL:**
```env
DATABASE_URL_POSTGRESQL="postgresql://tu_usuario:tu_password@localhost:5432/university_db"
```

**MySQL:**
```env
DATABASE_URL_MYSQL="mysql://tu_usuario:tu_password@localhost:3306/university_db"
```

**SQL Server:**
```env
DATABASE_URL_SQLSERVER="sqlserver://localhost:1433;database=university_db;username=tu_usuario;password=tu_password;encrypt=true;trustServerCertificate=true"
```

### 2. Cambiar Tipo de Base de Datos

```bash
# Cambiar a PostgreSQL
npm run db:config:postgresql

# Ejecutar migraciones
npm run prisma:migrate

# Generar cliente Prisma
npm run prisma:generate

# Poblar con datos de prueba (opcional)
npm run prisma:seed
```

## 📋 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run db:config` | Configuración interactiva |
| `npm run db:setup:sqlite` | Configurar y migrar SQLite |
| `npm run db:setup:postgresql` | Configurar y migrar PostgreSQL |
| `npm run db:setup:mysql` | Configurar y migrar MySQL |
| `npm run db:setup:sqlserver` | Configurar y migrar SQL Server |
| `npm run db:config:sqlite` | Solo configurar SQLite |
| `npm run db:config:postgresql` | Solo configurar PostgreSQL |
| `npm run db:config:mysql` | Solo configurar MySQL |
| `npm run db:config:sqlserver` | Solo configurar SQL Server |
| `npm run prisma:generate` | Generar cliente Prisma |
| `npm run prisma:migrate` | Ejecutar migraciones |
| `npm run prisma:seed` | Poblar con datos de prueba |
| `npm run prisma:studio` | Abrir Prisma Studio |

## 🐳 Docker (Opcional)

Puedes usar Docker para levantar bases de datos de desarrollo:

### PostgreSQL
```bash
docker run --name postgres-university \
  -e POSTGRES_DB=university_db \
  -e POSTGRES_USER=university \
  -e POSTGRES_PASSWORD=password123 \
  -p 5432:5432 \
  -d postgres:15
```

### MySQL
```bash
docker run --name mysql-university \
  -e MYSQL_DATABASE=university_db \
  -e MYSQL_USER=university \
  -e MYSQL_PASSWORD=password123 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -p 3306:3306 \
  -d mysql:8.0
```

### SQL Server
```bash
docker run --name sqlserver-university \
  -e ACCEPT_EULA=Y \
  -e SA_PASSWORD=Password123! \
  -p 1433:1433 \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

## 🔍 Verificación

Para verificar que todo está funcionando correctamente:

1. **Verificar configuración:**
   ```bash
   cat .env | grep DB_TYPE
   ```

2. **Verificar esquema activo:**
   ```bash
   head -10 infrastructure/database/prisma/schema.prisma
   ```

3. **Probar conexión:**
   ```bash
   npm run prisma:studio
   ```

## ❗ Notas Importantes

- **Backup:** Siempre haz backup de tu base de datos antes de cambiar de tipo
- **Migraciones:** Las migraciones pueden variar entre diferentes tipos de base de datos
- **Datos:** Los datos no se migran automáticamente entre diferentes tipos de base de datos
- **Dependencias:** Asegúrate de tener instalados los drivers necesarios para cada tipo de base de datos

## 🆘 Solución de Problemas

### Error de conexión
- Verifica que la base de datos esté ejecutándose
- Revisa las credenciales en el archivo `.env`
- Asegúrate de que el puerto esté disponible

### Error de migración
- Elimina la carpeta `prisma/migrations` si cambias de tipo de base de datos
- Ejecuta `npm run prisma:migrate` para crear nuevas migraciones

### Error de generación
- Ejecuta `npm run prisma:generate` después de cualquier cambio en el esquema
- Reinicia tu servidor de desarrollo

---

¿Necesitas ayuda? Revisa la [documentación de Prisma](https://www.prisma.io/docs/) o crea un issue en el repositorio.