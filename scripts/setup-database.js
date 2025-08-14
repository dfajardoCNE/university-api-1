const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

// Crear interfaz de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Función para mostrar las opciones de base de datos
 */
function showDatabaseOptions() {
  console.log('\n🗄️  Configuración de Base de Datos\n');
  console.log('Selecciona el tipo de base de datos:');
  
  Object.entries(DATABASE_TYPES).forEach(([key, config], index) => {
    console.log(`${index + 1}. ${config.name}`);
  });
  
  console.log('\n');
}

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
  
  console.log(`✅ Esquema ${DATABASE_TYPES[dbType].name} copiado exitosamente`);
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
 * Función para mostrar información post-configuración
 */
function showPostSetupInfo(dbType) {
  const config = DATABASE_TYPES[dbType];
  
  console.log('\n📋 Configuración completada\n');
  console.log(`Base de datos seleccionada: ${config.name}`);
  console.log(`Variable de entorno: ${config.envVar}`);
  console.log('\n📝 Próximos pasos:');
  console.log('1. Configura la URL de conexión en el archivo .env');
  console.log('2. Ejecuta: npm run prisma:generate');
  console.log('3. Ejecuta: npm run prisma:migrate');
  console.log('4. Ejecuta: npm run prisma:seed (opcional)');
  console.log('\n🚀 ¡Tu base de datos está lista para usar!');
}

/**
 * Función principal
 */
function main() {
  showDatabaseOptions();
  
  rl.question('Ingresa el número de tu elección: ', (answer) => {
    const choice = parseInt(answer);
    const dbTypes = Object.keys(DATABASE_TYPES);
    
    if (choice < 1 || choice > dbTypes.length) {
      console.log('❌ Opción inválida. Por favor selecciona un número válido.');
      rl.close();
      return;
    }
    
    const selectedDbType = dbTypes[choice - 1];
    
    try {
      console.log(`\n🔄 Configurando ${DATABASE_TYPES[selectedDbType].name}...`);
      
      // Copiar esquema
      copySchema(selectedDbType);
      
      // Actualizar archivo .env
      updateEnvFile(selectedDbType);
      
      // Mostrar información post-configuración
      showPostSetupInfo(selectedDbType);
      
    } catch (error) {
      console.error('❌ Error durante la configuración:', error.message);
    } finally {
      rl.close();
    }
  });
}

// Verificar que el directorio de esquemas existe
if (!fs.existsSync(SCHEMAS_DIR)) {
  console.error('❌ Error: El directorio de esquemas no existe:', SCHEMAS_DIR);
  process.exit(1);
}

// Ejecutar función principal
main();