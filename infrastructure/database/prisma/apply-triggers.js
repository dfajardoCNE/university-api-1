const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function applyTriggers() {
  const prisma = new PrismaClient();
  const triggersPath = path.join(__dirname, 'triggers.sql');
  
  try {
    // Verificar existencia del archivo de triggers
    if (!fs.existsSync(triggersPath)) {
      console.warn(`[apply-triggers] triggers.sql not found at ${triggersPath}. Skipping trigger application.`);
      return;
    }

    // Leer el archivo de triggers
    const triggersSql = fs.readFileSync(triggersPath, 'utf8').trim();

    if (!triggersSql) {
      console.warn('[apply-triggers] triggers.sql is empty. Skipping trigger application.');
      return;
    }
    
    // Ejecutar los triggers SQL directamente en la base de datos
    await prisma.$executeRawUnsafe(triggersSql);
    
    console.log('Triggers aplicados correctamente');
  } catch (error) {
    console.error('Error al aplicar triggers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

applyTriggers();