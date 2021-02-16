<template>
	<form @submit.prevent="handleSubmit" class="form">
    <h1>Register</h1>
		<input type="text" required placeholder="Display Name" v-model="displayName">
		<input type="email" required placeholder="Email" v-model="email">
		<input type="password" required placeholder="Password" v-model="password">
		<div class="error">{{ error }}</div>
		<button class="register">Register</button>
		<p>Already registered? <span  @click="showLogin">Login</span> instead</p>
	</form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup'
import { useRouter } from 'vue-router'

export default {
	setup(props, context) {
		const { error, signup } = useSignup()
		const router = useRouter()

		// refs
		const displayName = ref('')
		const email = ref('')
		const password = ref('')

		const handleSubmit = async () => {
			await signup(email.value, password.value, displayName.value)
			console.log('user signed up')
			if(!error.value) {
				context.emit("signup")
			}
		}

		const showLogin = () => {
			router.push({ name: 'Login' })
		}

		return { displayName, email, password, handleSubmit, error, showLogin }
	}
}
</script>

<style>

</style>