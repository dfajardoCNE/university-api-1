const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para Vercel...');

try {
  // 1. Instalar dependencias
  console.log('📦 Instalando dependencias...');
  execSync('npm ci', { stdio: 'inherit' });

  // 2. Generar cliente Prisma
  console.log('🔧 Generando cliente Prisma...');
  execSync('npx prisma generate --schema=infrastructure/database/prisma/schema.prisma', { stdio: 'inherit' });

  // 3. Compilar aplicación
  console.log('🏗️ Compilando aplicación...');
  execSync('npm run build', { stdio: 'inherit' });

  // 4. Copiar archivos necesarios
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

  // Copiar package.json al directorio dist
  const packageSource = path.join(__dirname, '..', 'package.json');
  const packageDest = path.join(__dirname, '..', 'dist', 'package.json');
  
  if (fs.existsSync(packageSource)) {
    fs.copyFileSync(packageSource, packageDest);
    console.log('✅ package.json copiado');
  }

  console.log('🎉 Build completado exitosamente!');

} catch (error) {
  console.error('❌ Error durante el build:', error.message);
  process.exit(1);
}