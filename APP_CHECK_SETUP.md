Guía para configurar Firebase App Check con reCAPTCHA v3

1) Registrar dominio en Firebase Console
- Abre https://console.firebase.google.com/
- Selecciona tu proyecto
- Ve a "App Check" en la barra lateral
- Selecciona la app web que corresponde (o crea una si no existe)

2) Crear clave reCAPTCHA v3
- Ve a https://www.google.com/recaptcha/admin/
- Añade un sitio nuevo, elige reCAPTCHA v3
- En "Dominios" añade el dominio donde servirás la app (ej: example.com) y localhost durante pruebas
- Copia la "Site key" (clave pública)

3) Activar App Check en Firebase
- En App Check, añade un proveedor reCAPTCHA v3 y pega la Site key
- Puedes habilitar el modo "Enforcement" después de verificar que las integraciones funcionan

4) Añadir la clave al cliente
- Abre `index.html` y busca el bloque near `RECAPTCHA_SITE_KEY`.
- Sustituye `REPLACE_WITH_RECAPTCHA_V3_SITE_KEY` por la Site key que copiaste.

5) Probar localmente
- Sirve la carpeta por HTTP (los módulos ES requieren origin HTTP/HTTPS). Por ejemplo:

  python -m http.server 5173

- Abre `http://localhost:5173` y mira la consola: deberías ver "App Check inicializado (reCAPTCHA v3)".

6) Habilitar enforcement (producción)
- Tras confirmar en staging que no hay errores y la app funciona, vuelve a Firebase Console → App Check y cambia a "Enforcement".
- Ten en cuenta que al forzar App Check, los clientes sin token válido dejarán de poder acceder a Firestore.

7) Recomendaciones
- Habilita `isTokenAutoRefreshEnabled` para renovar tokens.
- Añade App Check en backend o funciones Cloud si las usas.
- Si usas CI/CD para deploys, no incluyas la site key en logs; la Site key es pública, pero evita exponer claves privadas.

8) Debug
- Usa Chrome DevTools Network para inspeccionar llamadas a recaptcha.net o firebaseappcheck.googleapis.com
- Si ves errores 401/403 en Firestore tras enforcement, revisa que el cliente esté enviando tokens y que el dominio registrado coincide.
