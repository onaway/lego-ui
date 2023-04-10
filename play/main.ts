import { createApp } from 'vue'
import App from './app.vue'
import lego from '@lego/components'

const app = createApp(App)

app.use(lego)
app.mount('#app')