import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import mLibs from './libs'
import 'virtual:svg-icons-register'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
useREM()
useTheme()
createApp(App).use(mLibs).use(router).use(store).mount('#app')
