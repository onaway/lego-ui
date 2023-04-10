import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"
import DefineOptions from "unplugin-vue-define-options/vite"

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: "./src",
      outputDir: ["../lego/es/src", "../lego/lib/src"],
      // 指定使用的 tsconfig.json 在整个项目根目录下，如果不配置，也可以在 components 下新建 tsconfig.json
      tsConfigFilePath: "../../tsconfig.json",
    }),
    DefineOptions(),
    {
      name: "style",
      generateBundle(config, bundle) {
        // 这里可以获取打包后的文件目录以及代码 code
        const keys = Object.keys(bundle)

        for (const key of keys) {
          const bundler: any = bundle[key as any]
          // rollup 内置方法,将所有输出文件 code 中的 .scss 换成 .css，因为我们当时没有打包 scss 文件

          this.emitFile({
            type: "asset",
            fileName: key, // 文件名不变
            source: bundler.code.replace(/\.scss/g, ".css"),
          })
        }
      },
    }
  ],
  build: {
    // 打包后文件目录
    outDir: "es",
    // 压缩
    minify: false,
    rollupOptions: {
      // 忽略打包 vue、scss 文件
      external: ["vue", /\.scss/],
      input: ["index.ts"],
      output: [
        {
          // 打包格式
          format: "es",
          // 打包后文件名
          entryFileNames: "[name].mjs",
          // 让打包目录和我们目录对应
          preserveModules: true,
          exports: "named",
          // 配置打包根目录
          dir: "../lego/es",
        },
        {
          // 打包格式
          format: "cjs",
          // 打包后文件名
          entryFileNames: "[name].js",
          // 让打包目录和我们目录对应
          preserveModules: true,
          exports: "named",
          // 配置打包根目录
          dir: "../lego/lib",
        }
      ]
    },
    lib: {
      entry: "./index.ts"
    },
  }
})