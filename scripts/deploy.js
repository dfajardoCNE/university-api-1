const { execSync } = require('child_process');
const readline = require('readline');

// Configuración de tipos de base de datos disponibles
const DATABASE_TYPES = {
  sqlite: 'SQLite',
  postgresql: 'PostgreSQL',
  mysql: 'MySQL',
  sqlserver: 'SQL Server'
};

// Crear interfaz de línea de comandos
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Script de despliegue para Vercel');
console.log('====================================');
console.log('Seleccione el tipo de base de datos a utilizar:');

let index = 1;
const options = {};

for (const [key, value] of Object.entries(DATABASE_TYPES)) {
  console.log(`${index}. ${value}`);
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
  console.log(`✅ Ha seleccionado: ${DATABASE_TYPES[dbType]}`);
  
  try {
    // Ejecutar el script correspondiente
    console.log(`🚀 Iniciando despliegue para ${DATABASE_TYPES[dbType]}...`);
    execSync(`node scripts/deploy-${dbType}.js`, { stdio: 'inherit' });
    
    console.log(`🎉 Despliegue para ${DATABASE_TYPES[dbType]} completado exitosamente!`);
  } catch (error) {
    console.error('❌ Error durante el despliegue:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
});