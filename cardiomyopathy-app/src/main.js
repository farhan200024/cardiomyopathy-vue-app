import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDfYBgvCS1Wu2MIpUaCqObkrG5bpq87WmM",
    authDomain: "cardiomyopathy-auth.firebaseapp.com",
    projectId: "cardiomyopathy-auth",
    storageBucket: "cardiomyopathy-auth.appspot.com",
    messagingSenderId: "648071341133",
    appId: "1:648071341133:web:b3083b0b1f2ddb6deaa804"
};

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
