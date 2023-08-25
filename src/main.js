import './assets/main.css'
import { setupCalendar } from 'v-calendar'
import 'v-calendar/style.css'

import 'maz-ui/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(setupCalendar, {})

app.mount('#app')


