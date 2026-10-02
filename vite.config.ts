import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import prefixer from 'postcss-prefix-selector'

const unwrapLayersPlugin = () => ({
  postcssPlugin: 'postcss-unwrap-layers',
  AtRule: {
    layer(atRule: any) {
      if (atRule.nodes && atRule.nodes.length > 0) {
        atRule.replaceWith(atRule.nodes)
      } else {
        atRule.remove()
      }
    }
  }
})
unwrapLayersPlugin.postcss = true

export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'production' || process.env.BUILD_LIB === 'true'

  return {
    server: {
      host: '127.0.0.1',
      port: 3001
    },
    css: {
      postcss: {
        plugins: [
          prefixer({
            prefix: '.sdi-messenger-root',
            transform(prefix, selector, prefixedSelector, filePath, rule) {
              if (
                selector === ':root' ||
                selector === 'html' ||
                selector === 'body' ||
                selector === ':host'
              ) {
                return prefix
              }
              if (
                selector.startsWith(':root') ||
                selector.startsWith('html') ||
                selector.startsWith('body') ||
                selector.startsWith(':host')
              ) {
                return selector.replace(/^(:root|html|body|:host)/, prefix)
              }
              if (selector.includes(prefix)) {
                return selector
              }
              if (selector.startsWith('.')) {
                return `${prefix}${selector}, ${prefix} ${selector}`
              }
              return `${prefix} ${selector}`
            }
          }),
          unwrapLayersPlugin()
        ]
      }
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
          banner: `'use client';\nif (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {\n  globalThis.self = globalThis;\n}\n`,
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
