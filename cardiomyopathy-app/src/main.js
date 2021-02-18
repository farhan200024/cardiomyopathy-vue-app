import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts";
import './assets/main.css'
import { projectAuth } from './firebase/config'

let app

projectAuth.onAuthStateChanged(() => {
	if(!app) {
		app = createApp(App)
			.use(router)
			.use(VueApexCharts)
			.mount('#app')
	}
})
