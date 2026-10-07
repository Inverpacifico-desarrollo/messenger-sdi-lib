# Guía de Desarrollo y Empaquetado (`DEVELOPER.md`)

Esta guía describe el flujo de trabajo para el desarrollo, compilación, empaquetado y prueba local de **`messenger-sdi-lib`**.

---

## 🏗️ 1. Requisitos del Entorno

- **Node.js**: v18.0.0 o superior (Recomendado v20+)
- **npm**: v9+ o gestor compatible

---

## 📥 2. Instalación de Dependencias

Clona el repositorio e instala los paquetes necesarios para desarrollo:

```bash
npm install
```

> **Nota para Windows (PowerShell):** Si tienes restricciones de ejecución de scripts en PowerShell, ejecuta los comandos con `npm.cmd` o anteponiendo `cmd /c npm ...`.

---

## 💻 3. Entorno de Desarrollo Local (Playground)

El repositorio incluye un entorno interactivo en la carpeta [`playground/`](file:///c:/Users/lhernandez/Desktop/dev/messenger-sdi-lib/playground) para probar los componentes en tiempo real con recarga rápida (HMR).

1. Crea tu archivo de variables locales a partir de la plantilla:
   ```bash
   cp .env.example .env
   ```
2. Configura tu token (`VITE_AUTH_TOKEN`), URLs y credenciales de WebSocket en `.env`.
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

Esto levantará el servidor de desarrollo Vite en `http://127.0.0.1:3001`.

---

## 🔍 4. Verificación de Tipos (TypeScript)

Antes de compilar, puedes verificar que no existan errores de tipos en TypeScript:

```bash
npm run typecheck
```

---

## 📦 5. Compilación y Construcción de la Librería

Para generar el bundle optimizado para producción (`ESM`, `CommonJS`, tipos `.d.ts` y CSS):

```bash
npm run build
```

### Archivos generados en la carpeta `dist/`:

| Archivo | Formato | Descripción |
| :--- | :--- | :--- |
| `dist/index.js` | **ES Module (ESM)** | Exportación principal moderna para bundlers (Vite, Webpack, Next.js). |
| `dist/index.cjs` | **CommonJS (CJS)** | Exportación compatible para Node.js / entornos legacy. |
| `dist/index.d.ts` | **TypeScript Definitions** | Tipos y contratos generados automáticamente. |
| `dist/messenger-sdi-lib.css` | **CSS Bundled** | Todos los estilos y utilidades Tailwind encapsulados bajo `.sdi-messenger-root`. |

---

## 🎁 6. Empaquetado Local (`npm pack`)

Para probar la librería en un proyecto anfitrión real (ej. tu app ERP, panel administrativo o frontend) **sin necesidad de publicarla en NPM**:

### Paso 1: Generar el archivo comprimido `.tgz`
Ejecuta en la raíz del proyecto:

```bash
npm pack
```

Esto generará un archivo comprimido como:
```text
messenger-sdi-lib-1.2.2.tgz
```

### Paso 2: Instalar en el proyecto anfitrión (Host App)
Copia o haz referencia al archivo `.tgz` desde tu proyecto de destino:

```bash
# Dentro del proyecto anfitrión:
npm install ../ruta-a/messenger-sdi-lib-1.2.2.tgz
```

> **Tip para actualizar cambios:** Si realizas cambios en la librería y generas un nuevo `.tgz`, para forzar la actualización en la app anfitriona ejecuta:
> ```bash
> npm install ../ruta-a/messenger-sdi-lib-1.2.2.tgz --force
> ```

---

## 🛡️ 7. Arquitectura de Estado y Estilos

- **Gestión de Estado Nativa (Zero React Query)**: Todas las consultas, mutaciones y paginación se gestionan mediante hooks nativos en `src/hooks/use-query.ts` y `src/hooks/use-mutate.ts`, garantizando compatibilidad absoluta con cualquier app anfitriona.
- **Tailwind v4**: Utiliza `@tailwindcss/vite` para procesar el diseño y utilidades.
- **PostCSS Scoping (`postcss-prefix-selector`)**: En [`vite.config.ts`](file:///c:/Users/lhernandez/Desktop/dev/messenger-sdi-lib/vite.config.ts), todas las reglas CSS se encapsulan bajo `.sdi-messenger-root`.
- **Componentes Raíz**: Si creas un nuevo componente independiente que pueda ser consumido fuera del widget flotante, asegúrate de que su contenedor principal incluya la clase `sdi-messenger-root`.

---

## 🚀 8. Publicación en Registro NPM (Opcional)

Si deseas publicar en un registro público o privado (ej. Verdaccio, GitHub Packages, NPM):

```bash
# 1. Asegúrate de compilar la versión final
npm run build

# 2. Incrementar versión semántica (patch, minor, major)
npm version patch

# 3. Publicar
npm publish --access public
```
