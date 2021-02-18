<template>
	<form v-if="!registered" @submit.prevent="signUpAction" class="form">
    <h1>Register</h1>
		<input type="text" required placeholder="Display Name" v-model="displayName">
		<input type="email" required placeholder="Email" v-model="email">
		<input type="password" required placeholder="Password" v-model="password">
		<div class="error">{{ error }}</div>
		<button class="success">Register</button>
		<p>Already registered? <span  @click="showLogin">Login</span> instead</p>
	</form>
	<div v-else class="email-verification-card">
		<p>A verification Email has be sent at:</p>
		<h1>{{ email }}</h1>
		<p>Please verify your email.</p>
	</div>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {

	setup() {
		const { error, /*signup*/ } = useSignup()
		const router = useRouter()
		const store = useStore()
		
		// refs
		const displayName = ref('')
		const email = ref('')
		const password = ref('')
		const registered = ref(false)

		// const handleSubmit = async () => {
		// 	await signup(email.value, password.value, displayName.value)
		// 	console.log('user signed up')
		// 	if(!error.value) {
		// 		context.emit("signup")
		// 		registered.value = !registered.value
		// 	}
		// }

		const signUpAction = () => {
			console.log(store)
			store.dispatch('signUpAction', { email: email.value, password: password.value, displayName: displayName.value })
		}

		const showLogin = () => {
			router.push({ name: 'Login' })
		}

		return 	{ 
							displayName,
							email,
							password,
							// handleSubmit,
							error,
							showLogin,
							registered,
							signUpAction
						}
	}
}
</script>

<style>
	.email-verification-card {
		height: 500px;
		align-items: center;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.email-verification-card p {
		font-size: 20px;
	}

	.email-verification-card h1 {
		font-size: 48px;
	}
</style>