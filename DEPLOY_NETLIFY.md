Despliegue automático a Netlify (GitHub Actions)

Este repositorio incluye un workflow de GitHub Actions en `.github/workflows/deploy-netlify.yml` que construye el proyecto y lo despliega a Netlify.

Requisitos antes de activar el workflow:
1. Crea un sitio en Netlify y copia su `Site ID`.
2. Genera un token de servicio (Personal access token) en Netlify:
   - En Netlify, abre User settings → Applications → Personal access tokens → New access token.
3. Añade los secretos en GitHub repository settings → Secrets → Actions:
   - `NETLIFY_AUTH_TOKEN` = (tu token de Netlify)
   - `NETLIFY_SITE_ID` = (Site ID de tu sitio en Netlify)

Cuando empujes a la rama `main`, GitHub Actions ejecutará `npm run build` y desplegará `dist/` en Netlify.

Si prefieres desplegar manualmente:
- Empuja `dist/` a Netlify arrastrando la carpeta en la interfaz de Netlify (Site → Deploys → Deploys → Drag and drop).

Nota sobre seguridad:
- Nunca compartas `NETLIFY_AUTH_TOKEN` en público.
- Revisa el workflow y registra la build en tu CI antes de activar producción.
