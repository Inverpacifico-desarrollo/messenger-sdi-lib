import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'production' || process.env.BUILD_LIB === 'true'

  return {
    server: {
      host:"127.0.0.1",
      port: 3001
    },
    plugins: [
      react(),
      tailwindcss(),
      dts({
        include: ['src'],
        insertTypesEntry: true,
        rollupTypes: false
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'MessengerSDI',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'style.css'
            return assetInfo.name || 'asset-[hash][extname]'
          }
        }
      },
      sourcemap: true,
      cssCodeSplit: false
    }
  }
})
