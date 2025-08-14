#!/usr/bin/env bash

#
# Despliegue automatizado de la Universidad API.
# Este script de ejemplo instala dependencias, aplica migraciones, genera
# el cliente de Prisma y ejecuta la aplicación en modo producción.
# Ajusta las variables de entorno y comandos según tu entorno de ejecución
# (por ejemplo, usando pm2 o Docker).

set -e

echo "[Deploy] Instalando dependencias..."
npm install --production

echo "[Deploy] Generando cliente Prisma..."
npm run prisma:generate

echo "[Deploy] Aplicando migraciones de base de datos..."
npm run prisma:migrate

echo "[Deploy] Construyendo la aplicación..."
npm run build

echo "[Deploy] Iniciando aplicación en modo producción..."
npm run start:prod