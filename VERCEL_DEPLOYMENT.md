# Despliegue en Vercel - University API

Esta guía explica cómo desplegar la University API en Vercel.

## Archivos de Configuración

### vercel.json
Archivo principal de configuración de Vercel que define:
- **Builds**: Configuración para compilar la aplicación NestJS
- **Routes**: Enrutamiento de todas las peticiones al archivo principal
- **Environment**: Variables de entorno para producción
- **Functions**: Configuración de timeouts y límites

### .vercelignore
Excluye archivos innecesarios del despliegue para optimizar el tamaño y velocidad.

### scripts/vercel-build.js
Script personalizado que:
1. Instala dependencias
2. Genera el cliente Prisma
3. Compila la aplicación
4. Copia archivos necesarios

## Variables de Entorno Requeridas

Configura estas variables en el dashboard de Vercel:

### Base de Datos
```bash
DB_TYPE=postgresql  # o sqlite, mysql, sqlserver
DATABASE_URL=postgresql://user:password@host:port/database
```

### Aplicación
```bash
NODE_ENV=production
PORT=3000
JWT_SECRET=tu_jwt_secret_seguro
JWT_EXPIRES_IN=7d
```

### Email (Opcional)
```bash
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu_email@gmail.com
MAIL_PASS=tu_password_de_aplicacion
```

### CORS
```bash
CORS_ORIGINS=https://tu-frontend.vercel.app,https://tu-dominio.com
```

## Pasos para Desplegar

### 1. Preparar el Repositorio
```bash
# Asegúrate de que todos los archivos estén committeados
git add .
git commit -m "Configuración para Vercel"
git push origin main
```

### 2. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Selecciona el proyecto `university-api`

### 3. Configurar Variables de Entorno
1. En el dashboard de Vercel, ve a Settings > Environment Variables
2. Agrega todas las variables listadas arriba
3. Asegúrate de seleccionar "Production" para cada variable

### 4. Configurar Base de Datos

#### Para PostgreSQL (Recomendado)
```bash
# Ejemplo con Supabase
DB_TYPE=postgresql
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
```

#### Para SQLite (Solo desarrollo)
```bash
DB_TYPE=sqlite
DATABASE_URL=file:./dev.db
```

### 5. Desplegar
1. Haz push a tu repositorio
2. Vercel automáticamente detectará los cambios y desplegará
3. O usa el botón "Deploy" en el dashboard

## Comandos Útiles

### Build Local (Simular Vercel)
```bash
npm run vercel-build
```

### Verificar Build
```bash
npm run build
npm run start:prod
```

### Configurar Base de Datos
```bash
# Para PostgreSQL
npm run db:config:postgresql

# Para MySQL
npm run db:config:mysql
```

## Troubleshooting

### Error: "Cannot find module '@prisma/client'"
**Solución**: Asegúrate de que `prisma generate` se ejecute durante el build.

### Error: "Database connection failed"
**Solución**: Verifica que `DATABASE_URL` esté correctamente configurada.

### Error: "Function timeout"
**Solución**: Aumenta `maxDuration` en `vercel.json` o optimiza las consultas.

### Error: "Module not found"
**Solución**: Verifica que todas las dependencias estén en `dependencies` (no en `devDependencies`).

## Optimizaciones

### 1. Caché de Dependencias
Vercel automáticamente cachea `node_modules` entre builds.

### 2. Prisma Client
El cliente se genera durante el build y se incluye en el bundle.

### 3. Variables de Entorno
Usa variables específicas por entorno (development, preview, production).

### 4. Regiones
Configura la región más cercana a tus usuarios en `vercel.json`.

## Monitoreo

### Logs
- Ve a Functions > View Function Logs en el dashboard
- Usa `console.log()` para debugging

### Analytics
- Habilita Vercel Analytics para métricas de rendimiento
- Monitorea errores y tiempos de respuesta

### Health Check
Crea un endpoint `/health` para verificar el estado:

```typescript
@Get('health')
getHealth() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  };
}
```

## Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Despliegue de NestJS](https://docs.nestjs.com/deployment)
- [Prisma en Vercel](https://www.prisma.io/docs/guides/deployment/deploying-to-vercel)