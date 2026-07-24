#!/usr/bin/env bash
# Script de configuracion de .env exclusivo para el Frontend
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_DIR"

MODE="${1:-dev}"

if [ "$MODE" = "prod" ] || [ "$MODE" = "production" ]; then
    echo "Configurando .env de produccion para el Frontend..."
    cp deployment/env/.env.production .env
else
    echo "Configurando .env de desarrollo para el Frontend..."
    cp deployment/env/.env.development .env
fi

echo "Archivo .env del Frontend configurado exitosamente."
