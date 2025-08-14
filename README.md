<div align="center">

# 🎓 Universidad API

[![NestJS v9](https://img.shields.io/badge/NestJS_v9-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL v14](https://img.shields.io/badge/PostgreSQL_v14-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma v4](https://img.shields.io/badge/Prisma_v4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![JWT v9](https://img.shields.io/badge/JWT_v9-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Swagger v6](https://img.shields.io/badge/Swagger_v6-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

API RESTful para el sistema de gestión universitaria desarrollada con arquitectura limpia.

[Características](#características) • [Instalación](#instalación) • [Uso](#ejecución) • [Documentación](#documentación-api) • [Licencia](#licencia)

</div>

## 📋 Descripción

Este proyecto implementa una API RESTful para la gestión de una universidad, siguiendo los principios de Clean Architecture. Proporciona un sistema completo para administrar estudiantes, profesores, cursos, calificaciones y más.

## 🛠️ Tecnologías

| Categoría | Tecnologías | Versión |
|-----------|-------------|--------|
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | v16.x |
| | ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) | v9.x |
| **Base de datos** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) | v14.x |
| **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) | v4.x |
| **Autenticación** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | v9.x |
| **Documentación** | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black) | v6.x |

## 📁 Estructura del Proyecto

```
university-api/
├── 📄 .env                    # Variables de entorno
├── 📄 .vercelignore          # Archivos excluidos en Vercel
├── 📄 vercel.json            # Configuración de Vercel
├── 📄 DATABASE_SETUP.md      # Guía de configuración de BD
├── 📄 VERCEL_DEPLOYMENT.md   # Guía de despliegue en Vercel
├── 📄 package.json           # Dependencias y scripts
├── 📄 main.ts               # Punto de entrada de la aplicación
├── 📄 app.module.ts         # Módulo principal
│
├── 📁 domain/               # 🏛️ Reglas de negocio y entidades
│   ├── entities/            # Entidades del dominio
│   ├── repositories/        # Interfaces de repositorios
│   └── use-cases/           # Casos de uso por módulo
│       ├── auth/            # Autenticación y autorización
│       ├── student/         # Gestión de estudiantes
│       ├── professor/       # Gestión de profesores
│       ├── course/          # Gestión de cursos
│       ├── enrollment/      # Inscripciones
│       ├── payment/         # Pagos y facturación
│       └── analytics/       # Reportes y análisis
│
├── 📁 infrastructure/       # 🔧 Implementaciones externas
│   ├── database/            # Configuración de base de datos
│   │   └── prisma/          # Cliente y esquema de Prisma
│   │       ├── schema.prisma        # Esquema principal
│   │       ├── seed.ts              # Datos de prueba
│   │       └── schemas/             # Templates de BD
│   │           ├── schema.sqlite.prisma
│   │           ├── schema.postgresql.prisma
│   │           ├── schema.mysql.prisma
│   │           └── schema.sqlserver.prisma
│   ├── auth/                # Servicios de autenticación
│   │   ├── guards/          # Guards JWT y roles
│   │   └── strategies/      # Estrategias de autenticación
│   └── services/            # Servicios externos (email, etc.)
│
├── 📁 application/          # 🎯 Lógica de aplicación
│   ├── dto/                 # DTOs por módulo
│   │   ├── auth/            # DTOs de autenticación
│   │   ├── student/         # DTOs de estudiantes
│   │   ├── course/          # DTOs de cursos
│   │   ├── payment/         # DTOs de pagos
│   │   └── ...              # Otros módulos
│   └── mappers/             # Convertidores entidad ↔ DTO
│
├── 📁 interfaces/           # 🌐 Adaptadores de interfaz
│   └── controllers/         # Controladores REST por módulo
│       ├── auth/            # Endpoints de autenticación
│       ├── student/         # Endpoints de estudiantes
│       ├── professor/       # Endpoints de profesores
│       ├── course/          # Endpoints de cursos
│       ├── enrollment/      # Endpoints de inscripciones
│       ├── payment/         # Endpoints de pagos
│       ├── analytics/       # Endpoints de reportes
│       └── dashboard/       # Endpoints del dashboard
│
├── 📁 shared/               # 🛠️ Utilidades compartidas
│   ├── guards/              # Guards de autenticación y roles
│   ├── pipes/               # Pipes de validación y sanitización
│   ├── decorators/          # Decoradores personalizados
│   └── utils/               # Utilidades generales
│
├── 📁 scripts/              # 🚀 Scripts de automatización
│   ├── setup-database.js           # Configuración interactiva de BD
│   ├── setup-database-auto.js      # Configuración automática de BD
│   ├── vercel-build.js             # Script de build para Vercel
│   └── deploy.sh                   # Script de despliegue
│
├── 📁 test/                 # 🧪 Pruebas E2E
│   ├── payment.e2e-spec.ts         # Pruebas de pagos
│   ├── enrollments.e2e-spec.ts     # Pruebas de inscripciones
│   └── academic-records.e2e-spec.ts # Pruebas de registros académicos
│
├── 📁 templates/            # 📧 Plantillas
│   └── emails/              # Plantillas de correo
│
└── 📁 dist/                 # 📦 Código compilado (generado)
    └── ...                  # Archivos JavaScript compilados
```

## 🚀 Instalación

<details>
<summary>Prerrequisitos</summary>

- Node.js (v16.x o superior)
- PostgreSQL (v14.x o superior)
- npm (v8.x o superior) o yarn (v1.22.x o superior)

</details>

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/dfajardoCNE/university-api.git
   cd university-api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus valores reales
   # Define DATABASE_URL, JWT_SECRET, CORS_ORIGINS, PORT, etc.
   ```

4. **Generar el cliente de Prisma:**
   ```bash
   npx prisma generate
   ```

5. **Configurar base de datos:**
   ```bash
   # Configuración interactiva (recomendado)
   npm run db:config
   
   # O configuración directa para PostgreSQL
   npm run db:setup:postgresql
   
   # Para otros tipos de BD
   npm run db:setup:sqlite
   npm run db:setup:mysql
   npm run db:setup:sqlserver
   ```

6. **Ejecutar migraciones y seed:**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

## ▶️ Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 🧪 Pruebas

Este proyecto incluye una configuración básica de Jest con `ts-jest` para pruebas unitarias y de integración. Para ejecutar todas las pruebas unitarias, utiliza:

```bash
npm run test
```

Las pruebas de extremo a extremo (E2E) se encuentran en el directorio `test/` y utilizan Supertest para enviar peticiones HTTP contra la API. Para ejecutarlas, corre:

```bash
npm run test:e2e
```

> 📌 Nota: Asegúrate de que tu base de datos esté configurada correctamente antes de lanzar las pruebas E2E, ya que estas iniciarán la aplicación completa.

## 🚢 Despliegue

### 🌐 Vercel (Recomendado)

Para desplegar en Vercel, sigue la guía detallada en [`VERCEL_DEPLOYMENT.md`](VERCEL_DEPLOYMENT.md):

```bash
# Build para Vercel
npm run vercel-build

# Configurar variables de entorno en Vercel dashboard
# DATABASE_URL, JWT_SECRET, NODE_ENV=production, etc.
```

**Archivos de configuración incluidos:**
- `vercel.json` - Configuración de build y routing
- `.vercelignore` - Archivos excluidos del despliegue
- `scripts/vercel-build.js` - Script personalizado de build

### 🐧 Servidor Linux

Se incluye un script de ejemplo en `scripts/deploy.sh` que automatiza el proceso de despliegue en un entorno Linux. Este script realiza lo siguiente:

1. Instala las dependencias en modo producción.
2. Genera el cliente de Prisma.
3. Aplica las migraciones de base de datos.
4. Compila la aplicación.
5. Inicia la API en modo producción.

Para utilizarlo, asegúrate de que el archivo sea ejecutable (`chmod +x scripts/deploy.sh`) y ejecútalo:

```bash
./scripts/deploy.sh
```

### 🐳 Docker

Si prefieres una estrategia basada en contenedores, puedes adaptar estos comandos a un `Dockerfile` y usar `docker-compose` para orquestar la base de datos y la API.

> 💡 **Tip**: Usa `npm run start:debug` para ejecutar con soporte de depuración.

## 🗄️ Configuración de Base de Datos

El proyecto soporta múltiples tipos de base de datos con configuración automática:

### Bases de Datos Soportadas
- **SQLite** - Para desarrollo local
- **PostgreSQL** - Recomendado para producción
- **MySQL** - Alternativa robusta
- **SQL Server** - Para entornos empresariales

### Configuración Rápida
```bash
# Configuración interactiva
npm run db:config

# Configuración directa
npm run db:setup:postgresql  # PostgreSQL
npm run db:setup:sqlite      # SQLite
npm run db:setup:mysql       # MySQL
npm run db:setup:sqlserver   # SQL Server
```

### Variables de Entorno
El sistema configura automáticamente estas variables en `.env`:
```bash
DB_TYPE=postgresql
DATABASE_URL_SQLITE=file:./dev.db
DATABASE_URL_POSTGRESQL=postgresql://user:pass@localhost:5432/university
DATABASE_URL_MYSQL=mysql://user:pass@localhost:3306/university
DATABASE_URL_SQLSERVER=sqlserver://localhost:1433;database=university
```

Para más detalles, consulta [`DATABASE_SETUP.md`](DATABASE_SETUP.md).

## 🛡️ Seguridad

La aplicación aplica varias medidas de seguridad por defecto:

- **CORS configurado** para permitir solo los dominios definidos en la variable `CORS_ORIGINS` del archivo `.env`.
- **Helmet** para establecer cabeceras HTTP seguras.
- **Sanitización de entradas** a través de un pipe global (`SanitizePipe`) que escapa caracteres especiales en todas las cadenas de texto recibidas.
- **Validación estricta** usando `ValidationPipe` con `whitelist` y `forbidNonWhitelisted`, de modo que se descartan campos no definidos en los DTOs y se transforman los tipos automáticamente.

Estas medidas ayudan a mitigar riesgos como XSS, inyección de datos y ataques de origen cruzado.

## 📚 Documentación API

La documentación interactiva de la API está disponible en Swagger:

```
http://localhost:3000/api/docs
```

<div align="center">

![Swagger UI](shared/utils/university-api.png)

</div>

## 🔐 Roles y Permisos

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **👑 Admin** | Administrador del sistema | Acceso completo a todas las funcionalidades |
| **👨‍🏫 Profesor** | Personal docente | Gestión de cursos, calificaciones y materiales |
| **👨‍🎓 Estudiante** | Alumnos registrados | Consulta de cursos, inscripciones y calificaciones |

## 📄 Licencia

[![Licencia MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit)

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

### ¿Encontraste un error o tienes una sugerencia?

[![Reportar Issue](https://img.shields.io/badge/Reportar_Issue-GitHub-green.svg)](https://github.com/dfajardoCNE/university-api/issues/new)

</div>