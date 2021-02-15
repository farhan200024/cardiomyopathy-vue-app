import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'


// ///adding the firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDfYBgvCS1Wu2MIpUaCqObkrG5bpq87WmM",
//     authDomain: "cardiomyopathy-auth.firebaseapp.com",
//     projectId: "cardiomyopathy-auth",
//     storageBucket: "cardiomyopathy-auth.appspot.com",
//     messagingSenderId: "648071341133",
//     appId: "1:648071341133:web:b3083b0b1f2ddb6deaa804"
// };

// firebase.initializeApp(firebaseConfig);
/// initializing the firebase configuration

createApp(App).use(store).use(router).mount('#app')
