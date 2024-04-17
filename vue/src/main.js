import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'


createApp(App).use(bootstrap).use(router).mount('#app')
