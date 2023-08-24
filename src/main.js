import './assets/main.css'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(VCalendar, {})

app.mount('#app')


