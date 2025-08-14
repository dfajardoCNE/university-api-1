const fs = require('fs');
const path = require('path');

// Configuración de tipos de base de datos disponibles
const DATABASE_TYPES = {
  sqlite: {
    name: 'SQLite',
    schema: 'schema.sqlite.prisma',
    envVar: 'DATABASE_URL_SQLITE'
  },
  postgresql: {
    name: 'PostgreSQL',
    schema: 'schema.postgresql.prisma',
    envVar: 'DATABASE_URL_POSTGRESQL'
  },
  mysql: {
    name: 'MySQL',
    schema: 'schema.mysql.prisma',
    envVar: 'DATABASE_URL_MYSQL'
  },
  sqlserver: {
    name: 'SQL Server',
    schema: 'schema.sqlserver.prisma',
    envVar: 'DATABASE_URL_SQLSERVER'
  }
};

// Rutas de archivos
const SCHEMAS_DIR = path.join(__dirname, '..', 'infrastructure', 'database', 'prisma', 'schemas');
const PRISMA_DIR = path.join(__dirname, '..', 'infrastructure', 'database', 'prisma');
const TARGET_SCHEMA = path.join(PRISMA_DIR, 'schema.prisma');
const ENV_FILE = path.join(__dirname, '..', '.env');

/**
 * Función para copiar el esquema seleccionado
 */
function copySchema(dbType) {
  const sourceSchema = path.join(SCHEMAS_DIR, DATABASE_TYPES[dbType].schema);
  
  if (!fs.existsSync(sourceSchema)) {
    throw new Error(`El esquema ${DATABASE_TYPES[dbType].schema} no existe`);
  }
  
  // Leer el contenido del esquema fuente
  const schemaContent = fs.readFileSync(sourceSchema, 'utf8');
  
  // Escribir al archivo schema.prisma principal
  fs.writeFileSync(TARGET_SCHEMA, schemaContent);
  
  console.log(`✅ Esquema ${DATABASE_TYPES[dbType].name} configurado exitosamente`);
}

/**
 * Función para actualizar la variable DB_TYPE en el archivo .env
 */
function updateEnvFile(dbType) {
  let envContent = '';
  
  // Leer archivo .env existente si existe
  if (fs.existsSync(ENV_FILE)) {
    envContent = fs.readFileSync(ENV_FILE, 'utf8');
  }
  
  // Actualizar o agregar DB_TYPE
  const dbTypeRegex = /^DB_TYPE=.*$/m;
  const newDbTypeLine = `DB_TYPE=${dbType}`;
  
  if (dbTypeRegex.test(envContent)) {
    envContent = envContent.replace(dbTypeRegex, newDbTypeLine);
  } else {
    envContent += `\n${newDbTypeLine}\n`;
  }
  
  // Asegurar que existan todas las variables de URL de base de datos
  Object.entries(DATABASE_TYPES).forEach(([key, config]) => {
    const envVarRegex = new RegExp(`^${config.envVar}=.*$`, 'm');
    if (!envVarRegex.test(envContent)) {
      let defaultUrl = '';
      switch (key) {
        case 'sqlite':
          defaultUrl = 'file:./dev.db';
          break;
        case 'postgresql':
          defaultUrl = 'postgresql://username:password@localhost:5432/university_db';
          break;
        case 'mysql':
          defaultUrl = 'mysql://username:password@localhost:3306/university_db';
          break;
        case 'sqlserver':
          defaultUrl = 'sqlserver://localhost:1433;database=university_db;username=sa;password=yourpassword;encrypt=true;trustServerCertificate=true';
          break;
      }
      envContent += `${config.envVar}=${defaultUrl}\n`;
    }
  });
  
  // Escribir archivo .env actualizado
  fs.writeFileSync(ENV_FILE, envContent);
  
  console.log(`✅ Archivo .env actualizado con DB_TYPE=${dbType}`);
}

/**
 * Función principal para configuración automática
 */
function setupDatabase(dbType) {
  if (!DATABASE_TYPES[dbType]) {
    console.error(`❌ Error: Tipo de base de datos '${dbType}' no válido.`);
    console.error(`Tipos válidos: ${Object.keys(DATABASE_TYPES).join(', ')}`);
    process.exit(1);
  }
  
  try {
    console.log(`🔄 Configurando ${DATABASE_TYPES[dbType].name}...`);
    
    // Copiar esquema
    copySchema(dbType);
    
    // Actualizar archivo .env
    updateEnvFile(dbType);
    
    console.log(`🎉 ${DATABASE_TYPES[dbType].name} configurado correctamente`);
    
  } catch (error) {
    console.error('❌ Error durante la configuración:', error.message);
    process.exit(1);
  }
}

// Verificar que el directorio de esquemas existe
if (!fs.existsSync(SCHEMAS_DIR)) {
  console.error('❌ Error: El directorio de esquemas no existe:', SCHEMAS_DIR);
  process.exit(1);
}

// Exportar función para uso en scripts npm
module.exports = setupDatabase;

// Si se ejecuta directamente, usar el primer argumento
if (require.main === module) {
  const dbType = process.argv[2];
  if (!dbType) {
    console.error('❌ Error: Debes especificar un tipo de base de datos.');
    console.error(`Uso: node setup-database-auto.js <tipo>`);
    console.error(`Tipos válidos: ${Object.keys(DATABASE_TYPES).join(', ')}`);
    process.exit(1);
  }
  setupDatabase(dbType);
}