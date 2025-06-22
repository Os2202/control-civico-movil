# Control Cívico Móvil

Aplicación web para el registro y gestión de actividades de control cívico, incluyendo el registro de personas, estadísticas, detenidos y decomisos.

## 🚀 Características

- **Registro de Personas**: Formulario individual y carga masiva desde archivos .txt
- **Estadísticas de Control Cívico**: Registro de eventos y contadores acumulados
- **Registro de Detenidos**: Gestión completa de detenciones con información legal
- **Registro de Decomisos**: Panel completo para diferentes tipos de drogas
- **Interfaz Responsiva**: Optimizada para uso en dispositivos móviles
- **Búsqueda y Filtrado**: Funcionalidades de búsqueda en tiempo real
- **Almacenamiento Local**: Datos persistentes en el navegador

## 🛠️ Tecnologías

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño responsivo
- **Radix UI** - Componentes de interfaz accesibles
- **Lucide React** - Iconografía
- **React Hook Form** - Manejo de formularios

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd pes
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   pnpm dev
   ```

4. **Acceder a la aplicación**
   - Local: http://localhost:3000
   - Red local: http://[TU_IP]:3000

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Vercel detectará automáticamente la configuración de Next.js
3. Tu aplicación estará disponible en minutos

### Netlify
1. Conecta tu repositorio a [Netlify](https://netlify.com)
2. Configura:
   - Build command: `pnpm build`
   - Output directory: `.next`

### Railway
1. Conecta tu repositorio a [Railway](https://railway.app)
2. Configura las variables de entorno si es necesario

## 📱 Uso

### Registro de Personas
- **Individual**: Completa el formulario con nombre y cédula
- **Masivo**: Sube un archivo .txt con formato "cédula nombre"

### Estadísticas
- Registra eventos de control cívico
- Incluye contadores de personas, vehículos y motos
- Resumen acumulado automático

### Detenidos
- Información completa: nombre, cédula, delito, fiscal, expediente
- Ubicación y fecha/hora automática

### Decomisos
- Diferentes tipos de drogas: marihuana, cocaína, crack, sintéticas
- Cantidades en gramos, kilos, dosis, etc.

## 🔧 Scripts Disponibles

- `pnpm dev` - Servidor de desarrollo
- `pnpm dev:lan` - Servidor accesible en red local
- `pnpm dev:ssl` - Servidor con SSL para desarrollo
- `pnpm build` - Construcción para producción
- `pnpm start` - Servidor de producción

## 📄 Licencia

Este proyecto es privado y está destinado para uso interno de control cívico.

## 🤝 Contribución

Para contribuir al proyecto, contacta al equipo de desarrollo. 