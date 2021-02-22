import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import LineChart from '../components/LineChart.vue'
import { projectAuth } from '../firebase/config'

const loggedOutGuard = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  if(!user) next({ name: 'Login' })
  else next()
}

const loggedInGuard = (to, from, next) => {
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
    beforeEnter: loggedOutGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loggedInGuard
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: loggedInGuard
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    beforeEnter: loggedInGuard
  },
  {
    path: '/chart-example',
    name: 'LineChart',
    component: LineChart,
    beforeEnter: loggedOutGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
