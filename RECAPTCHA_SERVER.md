Uso seguro de la clave secreta reCAPTCHA (no expongas en el cliente)

Clave secreta (proporcionada por ti):
- 6LfG27AtAAAAADiu94f6L8rkIEh_rhyP4XnLgRgE

IMPORTANTE: Nunca incluyas la clave secreta en `index.html` ni en ningún archivo cliente. Trata la clave secreta como credencial privada y almacénala en un entorno seguro (variables de entorno del servidor, Secret Manager, o archivo de configuración solo en backend).

Opciones de backend para verificar/crear assessments

1) Google reCAPTCHA Enterprise - CreateAssessment (recomendado)
- Implementa un endpoint en tu backend que reciba el token del cliente (si usas la API de App Check o reCAPTCHA en cliente) y llame a CreateAssessment con la clave secreta.
- Sigue estos pasos generales:
  - Cliente obtiene token (por ejemplo, con App Check o reCAPTCHA v3) y lo envía al backend en una petición POST.
  - Backend llama a la API CreateAssessment / SiteVerify usando la clave secreta y procesa la respuesta.
  - Backend decide si permitir la acción (escribir en Firestore, crear recursos, etc.) basado en el resultado.

2) Verificación simple con SiteVerify (legacy)
- Si decides usar SiteVerify en lugar de CreateAssessment, sigue las instrucciones de migración y seguridad de Google. SiteVerify usa la clave secreta y un endpoint HTTP para validar tokens del cliente.

Ejemplo Node.js (Express) - esquema CreateAssessment (pseudo):

```js
// Usa una librería HTTP o cliente oficial para llamar a Google
app.post('/verify-recaptcha', async (req, res) => {
  const token = req.body.token;
  // Llama a la API de Google con la clave secreta almacenada en process.env.RECAPTCHA_SECRET
  // Ejemplo simplificado - sustituye por SDK oficial o entorno seguro
  const response = await fetch('https://recaptchaenterprise.googleapis.com/v1/projects/PROJECT_ID/assessments?key=' + process.env.RECAPTCHA_SECRET, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      assessment: {
        event: { token }
      }
    })
  });
  const data = await response.json();
  // Analiza `data` y decide
  res.json(data);
});
```

Recomendaciones
- Almacena la clave secreta en un gestor de secretos (`Secret Manager`, `Vault`) o en variables de entorno del servidor.
- Limita accesos y rotación periódica de la clave.
- No la incluyas en repositorios ni en logs.
- Implementa control de rate limiting y monitoriza intentos fallidos.

Referencias
- https://cloud.google.com/recaptcha-enterprise/docs
- https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages
- https://docs.cloud.google.com/recaptcha/docs/using-features#migrate-backend
