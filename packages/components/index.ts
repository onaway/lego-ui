import * as components from './src/index'
import { App } from 'vue'

export * from './src/index'

export default {
  install: (app: App) => {
    for(let c in components) {
      app.use(components[c])
    }
  }
}