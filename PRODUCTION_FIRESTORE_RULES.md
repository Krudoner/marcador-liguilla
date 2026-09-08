Resumen de reglas e instrucciones para producción

Archivos añadidos:
- `firebase.rules` — reglas de Firestore (recomendadas)
- `firebase.json` — configuración mínima para Hosting + reglas

Objetivo
- Evitar escrituras arbitrarias masivas o malformadas desde clientes anónimos.
- Recomendación principal: habilitar Firebase Authentication y permitir writes sólo a usuarios autenticados.

Reglas principales (explicación)
1) `allow read: if true;`
   - Permite lecturas públicas para que los visitantes puedan ver la liguilla compartida.
   - Si quieres privacidad, cambia a `request.auth != null`.

2) Escrituras autenticadas (recomendado):
   - `allow create, update, delete: if request.auth != null && request.auth.uid == request.resource.data.writer;`
   - Esto requiere que el cliente almacene `writer` con el `uid` del usuario autenticado y que uses Firebase Auth en el frontend.

3) Fallback público validado (menos seguro):
   - Si no hay `request.auth`, se permite `create/update` sólo si el payload pasa `validPublicWrite()`.
   - `validPublicWrite()` valida campos esperados, tamaños de arrays y longitudes de strings para limitar abusos.

Limitaciones y recomendaciones adicionales
- Reglas no imponen límite de tasa (rate-limiting). Para proteger contra abusos, implementa:
  - Cloud Functions que escriban en Firestore tras validar/restringir, o
  - un backend intermedio con verificación de uso, o
  - uso de Firebase App Check + reCAPTCHA para limitar clients.

- Cambia el flujo del cliente para usar Firebase Auth (anónimo o con proveedor) y guardar `writer = request.auth.uid`.
  - Si usas Auth anónima (anonymous sign-in), asegúrate de vincular cuentas si migras a credenciales.

Cómo desplegar
1) Instala Firebase CLI si no la tienes:
```bash
npm install -g firebase-tools
firebase login
```
2) Inicializa hosting/reglas si aún no lo hiciste (opcional):
```bash
firebase init
```
3) Despliega sólo las reglas de Firestore:
```bash
firebase deploy --only firestore:rules
```
4) Despliega hosting (si usas Firebase Hosting):
```bash
firebase deploy --only hosting
# o todo junto
firebase deploy
```

Comprobaciones posterior al despliegue
- Prueba lecturas y escrituras desde el cliente y desde la consola de Firestore.
- En la consola de Reglas, usa el simulador para probar distintos request.auth y payloads.

¿Quieres que:
- 1) implemente autenticación anónima en el frontend y ajuste `writer` para usar `auth.uid` (recomendado), o
- 2) deje el flujo actual (clientId) y agregue App Check + reCAPTCHA para mitigar abusos?

Dime cuál prefieres y la implemento.