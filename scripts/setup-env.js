const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuración de tipos de base de datos disponibles
const DATABASE_TYPES = {
  sqlite: {
    name: 'SQLite',
    envVar: 'DATABASE_URL_SQLITE',
    defaultValue: 'file:./dev.db'
  },
  postgresql: {
    name: 'PostgreSQL',
    envVar: 'DATABASE_URL_POSTGRESQL',
    defaultValue: 'postgresql://postgres:password@localhost:5432/university?schema=public'
  },
  mysql: {
    name: 'MySQL',
    envVar: 'DATABASE_URL_MYSQL',
    defaultValue: 'mysql://root:password@localhost:3306/university'
  },
  sqlserver: {
    name: 'SQL Server',
    envVar: 'DATABASE_URL_SQLSERVER',
    defaultValue: 'sqlserver://localhost:1433;database=university;user=sa;password=Password123;trustServerCertificate=true'
  }
};

// Ruta del archivo .env
const ENV_FILE = path.join(__dirname, '..', '.env');

// Crear interfaz de línea de comandos
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Función para actualizar el archivo .env
 */
function updateEnvFile(dbType, connectionString) {
  // Verificar si el archivo .env existe
  if (!fs.existsSync(ENV_FILE)) {
    // Si no existe, crear uno nuevo con la variable de entorno
    const envContent = `${DATABASE_TYPES[dbType].envVar}="${connectionString}"
`;
    fs.writeFileSync(ENV_FILE, envContent);
    console.log(`✅ Archivo .env creado con la variable ${DATABASE_TYPES[dbType].envVar}`);
    return;
  }

  // Leer el contenido actual del archivo .env
  let envContent = fs.readFileSync(ENV_FILE, 'utf8');

  // Verificar si la variable ya existe en el archivo
  const regex = new RegExp(`${DATABASE_TYPES[dbType].envVar}=.*`, 'g');
  if (regex.test(envContent)) {
    // Si existe, actualizar su valor
    envContent = envContent.replace(regex, `${DATABASE_TYPES[dbType].envVar}="${connectionString}"`);
  } else {
    // Si no existe, añadirla al final del archivo
    envContent += `\n${DATABASE_TYPES[dbType].envVar}="${connectionString}"`;
  }

  // Escribir el contenido actualizado al archivo .env
  fs.writeFileSync(ENV_FILE, envContent);
  console.log(`✅ Variable ${DATABASE_TYPES[dbType].envVar} actualizada en el archivo .env`);
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Configuración de variables de entorno para la base de datos');
  console.log('====================================================');
  console.log('Seleccione el tipo de base de datos a configurar:');

  let index = 1;
  const options = {};

  for (const [key, value] of Object.entries(DATABASE_TYPES)) {
    console.log(`${index}. ${value.name}`);
    options[index] = key;
    index++;
  }

  rl.question('Ingrese el número de la opción deseada: ', (answer) => {
    const selection = parseInt(answer.trim());
    
    if (!options[selection]) {
      console.error('❌ Opción inválida');
      rl.close();
      process.exit(1);
    }
    
    const dbType = options[selection];
    console.log(`✅ Ha seleccionado: ${DATABASE_TYPES[dbType].name}`);
    
    rl.question(`Ingrese la cadena de conexión para ${DATABASE_TYPES[dbType].name} [${DATABASE_TYPES[dbType].defaultValue}]: `, (connectionString) => {
      // Si no se proporciona una cadena de conexión, usar el valor por defecto
      const finalConnectionString = connectionString.trim() || DATABASE_TYPES[dbType].defaultValue;
      
      // Actualizar el archivo .env
      updateEnvFile(dbType, finalConnectionString);
      
      console.log(`🎉 Configuración de ${DATABASE_TYPES[dbType].name} completada exitosamente!`);
      rl.close();
    });
  });
}

// Ejecutar la función principal si este script se ejecuta directamente
if (require.main === module) {
  main();
}

module.exports = updateEnvFile;