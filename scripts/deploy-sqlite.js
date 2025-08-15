const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando despliegue para SQLite...');

try {
  // 1. Configurar base de datos SQLite
  console.log('🔧 Configurando SQLite...');
  execSync('npm run db:config:sqlite', { stdio: 'inherit' });

  // 2. Instalar dependencias
  console.log('📦 Instalando dependencias...');
  execSync('npm ci', { stdio: 'inherit' });

  // 3. Generar cliente Prisma
  console.log('🔧 Generando cliente Prisma...');
  execSync('npx prisma generate --schema=infrastructure/database/prisma/schema.prisma', { stdio: 'inherit' });

  // 4. Ejecutar migraciones
  console.log('🗃️ Ejecutando migraciones...');
  execSync('npx prisma migrate deploy --schema=infrastructure/database/prisma/schema.prisma', { stdio: 'inherit' });

  // 5. Poblar la base de datos con datos iniciales
  console.log('🌱 Poblando la base de datos...');
  execSync('npm run prisma:seed', { stdio: 'inherit' });

  // 6. Compilar aplicación para producción
  console.log('🏗️ Compilando aplicación...');
  execSync('npm run build', { stdio: 'inherit' });

  // 7. Copiar archivos necesarios
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

  console.log('🎉 Despliegue para SQLite completado exitosamente!');

} catch (error) {
  console.error('❌ Error durante el despliegue:', error.message);
  process.exit(1);
}