import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import LineChart from '../components/LineChart.vue'
import { projectAuth } from '../firebase/config'

const authenticationGuard = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  if(!user) next({ name: 'Login' })
  else next()
}

const authenticationGuard2 = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  if(user) next({ path: '/' })
  else next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authenticationGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: authenticationGuard2
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: authenticationGuard2
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    beforeEnter: authenticationGuard2
  },
  {
    path: '/chart-example',
    name: 'LineChart',
    component: LineChart,
    beforeEnter: authenticationGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
