Archivo dist listo para despliegue

Opciones para desplegar `dist/` en Netlify:

1) Subir manualmente en Netlify (drag & drop):
   - Abre https://app.netlify.com/sites/<your-site>/deploys
   - Arrastra `dist.zip` o descomprime `dist.zip` y arrastra la carpeta `dist/`.

2) Usar netlify-cli (requiere `NETLIFY_AUTH_TOKEN` y `NETLIFY_SITE_ID`):

   export NETLIFY_AUTH_TOKEN=xxx
   export NETLIFY_SITE_ID=yyy
   npx netlify-cli deploy --dir=dist --prod --site=$NETLIFY_SITE_ID

3) Despliegue desde GitHub Actions:
   - Añade los secretos `NETLIFY_AUTH_TOKEN` y `NETLIFY_SITE_ID` en GitHub Repo → Settings → Secrets → Actions.
   - Fuerza un push a `main` (puedes crear un commit vacío) o re-run del workflow.

Archivo creado automáticamente por el asistente: `dist.zip` (incluye todo el contenido de `dist/`).
