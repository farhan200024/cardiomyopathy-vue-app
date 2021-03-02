<template>
	<form v-if="!registered" @submit.prevent="signUpAction" class="form">
    <h1>Register</h1>
		<input type="text" required placeholder="First Name" v-model="firstName">
		<input type="text" required placeholder="Last Name" v-model="lastName">
		<input type="text" required placeholder="Display Name" v-model="displayName">
		<input type="email" required placeholder="Email" v-model="email">
		<input type="password" required placeholder="Password" v-model="password">
		<input type="password" required placeholder="Confirm Password" v-model="confirmPassword">
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
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { timestamp } from '../firebase/config'

export default {

	setup() {
		const { error, /*signup*/ } = useSignup()
		const router = useRouter()
		const route = useRoute()
		const store = useStore()
		
		// refs
		const firstName = ref('')
		const lastName = ref('')
		const displayName = ref('')
		const email = ref('')
		const password = ref('')
		const confirmPassword = ref('')
		const registered = ref(false)
		
		if(route.params.email) {
			email.value = route.params.email
		}

		const signUpAction = () => {
			console.log(store)
			if(password.value === confirmPassword.value) {
				let user = {
					firstName: firstName.value,
					lastName: lastName.value,
					displayName: displayName.value,
					email: email.value,
					password: password.value,
					createdAt: timestamp()
				}
				store.dispatch('signUpAction', { user })
			} else {
				console.log('Passwords do not match!!')
			}
		}

		const showLogin = () => {
			router.push({ name: 'Login' })
		}

		return 	{ 
							firstName,
							lastName,
							displayName,
							email,
							password,
							confirmPassword,
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