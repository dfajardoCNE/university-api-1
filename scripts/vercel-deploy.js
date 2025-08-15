const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando despliegue automático para Vercel...');

// Detectar el tipo de base de datos basado en las variables de entorno disponibles
function detectDatabaseType() {
  if (process.env.DATABASE_URL_POSTGRESQL) {
    return 'postgresql';
  } else if (process.env.DATABASE_URL_MYSQL) {
    return 'mysql';
  } else if (process.env.DATABASE_URL_SQLSERVER) {
    return 'sqlserver';
  } else if (process.env.DATABASE_URL_SQLITE) {
    return 'sqlite';
  } else {
    // Por defecto, usar PostgreSQL (común en Vercel)
    return 'postgresql';
  }
}

try {
  // Detectar el tipo de base de datos
  const dbType = detectDatabaseType();
  console.log(`✅ Tipo de base de datos detectado: ${dbType}`);

  // 1. Configurar base de datos
  console.log(`🔧 Configurando ${dbType}...`);
  execSync(`npm run db:config:${dbType}`, { stdio: 'inherit' });

  // 2. Generar cliente Prisma
  console.log('🔧 Generando cliente Prisma...');
  execSync('npx prisma generate --schema=infrastructure/database/prisma/schema.prisma', { stdio: 'inherit' });

  // 3. Ejecutar migraciones
  console.log('🗃️ Ejecutando migraciones...');
  execSync('npx prisma migrate deploy --schema=infrastructure/database/prisma/schema.prisma', { stdio: 'inherit' });

  // 4. Poblar la base de datos con datos iniciales (solo si es necesario)
  if (process.env.SEED_DATABASE === 'true') {
    console.log('🌱 Poblando la base de datos...');
    execSync('npm run prisma:seed', { stdio: 'inherit' });
  }

  // 5. Compilar aplicación para producción
  console.log('🏗️ Compilando aplicación...');
  execSync('npm run build', { stdio: 'inherit' });

  // 6. Copiar archivos necesarios
  console.log('📋 Copiando archivos necesarios...');
  
  // Copiar schema.prisma al directorio dist
  const schemaSource = path.join(__dirname, '..', 'infrastructure', 'database', 'prisma', 'schema.prisma');
  const schemaDestDir = path.join(__dirname, '..', 'dist', 'infrastructure', 'database', 'prisma');
  const schemaDest = path.join(schemaDestDir, 'schema.prisma');
  
  if (!fs.existsSync(schemaDestDir)) {
    fs.mkdirSync(schemaDestDir, { recursive: true });
  }
  
  if (fs.existsSync(schemaSource)) {
    fs.copyFileSync(schemaSource, schemaDest);
    console.log('✅ Schema Prisma copiado');
  }

  console.log('🎉 Despliegue automático para Vercel completado exitosamente!');

} catch (error) {
  console.error('❌ Error durante el despliegue:', error.message);
  process.exit(1);
}