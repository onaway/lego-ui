import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from "unplugin-vue-define-options/vite"
import Components from 'unplugin-vue-components/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    // 配置后 components 目录下的组件无需引入即可使用
    Components({
      resolvers: [
        IconsResolver({ customCollections: ['icon'] })
      ]
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        icon: FileSystemIconLoader(path.resolve(process.cwd(), '../static/icons'), (svg) =>
          svg
            .replace(/^<svg /, '<svg width="1em" height="1em" class="svg-icon" fill="currentColor" ')
            .replace(/fill="#[^\\"]+"/g, 'fill="currentColor"')
            .replace(/<title[^>]*>(.|)*<\/title>/gi, '')
        )
      }
    })
  ]
})