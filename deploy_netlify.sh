#!/usr/bin/env bash
# Script opcional para desplegar en Netlify desde CI localmente.
# Requiere: NETLIFY_AUTH_TOKEN y NETLIFY_SITE_ID en el entorno.

if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ -z "$NETLIFY_SITE_ID" ]; then
  echo "Faltan variables NETLIFY_AUTH_TOKEN o NETLIFY_SITE_ID. Exportalas antes de ejecutar."
  echo "Ej: export NETLIFY_AUTH_TOKEN=xxxxx && export NETLIFY_SITE_ID=yyyy && ./deploy_netlify.sh"
  exit 1
fi

# instalar netlify-cli si no existe
if ! command -v netlify >/dev/null 2>&1; then
  echo "Instalando netlify-cli (temporal)..."
  npm install -g netlify-cli
fi

echo "Desplegando carpeta dist/ al sitio Netlify $NETLIFY_SITE_ID"
netlify deploy --dir=dist --prod --site=$NETLIFY_SITE_ID
