import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@shared/styles/base.css'
import '@shared/styles/design-tokens.css'
import '@shared/styles/themes/taoist.css'
import './assets/styles/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
