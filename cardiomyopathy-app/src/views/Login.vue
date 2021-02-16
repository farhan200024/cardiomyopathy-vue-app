<template>
	<form @submit.prevent="handleSubmit" class="form">
        <h1>Login</h1>
		<input type="email" required placeholder="Email" v-model="email">
		<input type="password" required placeholder="Password" v-model="password">
		<div class="error">{{ error }}</div>
		<button class="login" >Log In</button>
		<p>No account yet? <span  @click="showSignup">Register</span> instead</p>
	</form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
	setup(props, context) {
		const router = useRouter()

		// refs
		const email = ref('')
		const password = ref('')

		const { error, login } = useLogin()

		const handleSubmit = async  () => {
			await login(email.value, password.value)
			if(!error.value) {
				console.log('user logged in')
				context.emit("login")
			}
		}

		const showSignup = () => {
			router.push({ name: 'Register' })
		}

		return { email, password, handleSubmit, error, showSignup }
	}
}
</script>

<style>

</style>