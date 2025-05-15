import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { UserConfig } from 'vite'

const baseConfig = {
  plugins: [vue(), vueJsx(), dts()],
  build: {
    // minify: false,  // 调试时关闭压缩
    outDir: 'lib',
    sourcemap: false,
    lib: {
      entry: resolve(__dirname, './packages/index.ts'),
      name: 'csmart-public-business',
      fileName: 'csmart-public-business'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', '@arco-design/web-vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        // 静态资源分类打包
				chunkFileNames: 'static/js/[name]-[hash].js',
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./packages', import.meta.url)),
      types: fileURLToPath(new URL('./types', import.meta.url)),
    }
  },
  server: {
    proxy: {
      '/c-smart5-zitiku.oss-cn-hongkong.aliyuncs.com': {
        target: 'https://c-smart5-zitiku.oss-cn-hongkong.aliyuncs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/c-smart5-zitiku.oss-cn-hongkong.aliyuncs.com/, ''),
      },
    }
  },
}

const config: UserConfig = process.env.NODE_ENV === 'development' ? {
  ...baseConfig,
  define: {
    'process.env': {
			TENANT_ID: 1660324805547
		},
  }
} : baseConfig

// https://vitejs.dev/config/
export default config;
