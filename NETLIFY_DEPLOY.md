# 🚀 Despliegue en Netlify - Control Cívico Móvil

## 📋 Configuración Actual

La aplicación ya está configurada para Netlify con:

- ✅ **Exportación estática** configurada en `next.config.mjs`
- ✅ **Archivo `netlify.toml`** con configuración optimizada
- ✅ **Archivo `_redirects`** para manejo de rutas
- ✅ **Build exitoso** verificado

## 🎯 Pasos para Desplegar

### Opción 1: Drag & Drop (Más Rápido)

1. **Construir la aplicación:**
   ```bash
   pnpm build
   ```

2. **Ir a [netlify.com](https://netlify.com)**
   - Crear cuenta o iniciar sesión

3. **Subir la carpeta `out`:**
   - Arrastrar y soltar la carpeta `out` completa
   - Netlify detectará automáticamente que es un sitio estático

4. **¡Listo!** Tu sitio estará disponible en una URL como:
   `https://random-name.netlify.app`

### Opción 2: Desde GitHub (Recomendado)

1. **Conectar repositorio:**
   - Ir a [netlify.com](https://netlify.com)
   - Hacer clic en "New site from Git"
   - Seleccionar GitHub y tu repositorio

2. **Configurar build:**
   - **Build command:** `pnpm build`
   - **Publish directory:** `out`
   - **Node version:** `18`

3. **Desplegar:**
   - Hacer clic en "Deploy site"
   - Netlify construirá automáticamente desde tu código

## ⚙️ Configuración Automática

El archivo `netlify.toml` ya incluye:

```toml
[build]
  command = "pnpm build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
```

## 🔧 Características del Despliegue

- ✅ **Sitio estático** - Carga rápida
- ✅ **HTTPS automático** - Seguridad garantizada
- ✅ **CDN global** - Acceso rápido desde cualquier lugar
- ✅ **Deploy automático** - Se actualiza con cada push a GitHub
- ✅ **Dominio personalizado** - Opcional

## 🚨 Solución de Problemas

### Si el build falla:
1. Verificar que `pnpm` esté instalado
2. Asegurar que todas las dependencias estén en `package.json`
3. Verificar que no haya errores de TypeScript

### Si las rutas no funcionan:
1. Verificar que el archivo `_redirects` esté en `public/`
2. Asegurar que `output: 'export'` esté en `next.config.mjs`

## 📱 Acceso Móvil

Una vez desplegado, podrás acceder desde:
- 📱 **Móviles** - URL directa
- 💻 **Computadoras** - URL directa
- 🌐 **Cualquier dispositivo** - URL directa

## 🎉 ¡Listo para Usar!

Tu aplicación estará disponible 24/7 con:
- ✅ Carga rápida
- ✅ Funcionalidad completa
- ✅ Diseño responsivo
- ✅ Sin necesidad de servidor 