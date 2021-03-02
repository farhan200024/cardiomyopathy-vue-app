<template>
	<form v-if="!registered" @submit.prevent="signUpAction">
		<div class="form">
			<h1>Register</h1>
			<div class="form-name-fields">
				<input type="text" placeholder="First Name" v-model="firstName" required>
				<input type="text" placeholder="Last Name" v-model="lastName" required>
			</div>
			<input type="text" placeholder="Display Name" v-model="displayName" required>
			<input type="text" placeholder="Address" v-model="address" >
			<input type="tel" placeholder="Phone Number" v-model="telNumber" >
			<input type="text" placeholder="Institituional Affiliation" v-model="institution" required>
			<input type="email" placeholder="Email" v-model="email" required>
			<div class="form-password-fields">
				<input type="password" placeholder="Password" v-model="password" required>
				<input type="password" placeholder="Confirm Password" v-model="confirmPassword" required>
			</div>
		</div>
		<div v-if="error" class="error">{{ error }}</div>
		<button class="success">Register</button>
		<p class="ext-link" >Already registered? <span  @click="showLogin">Login</span> instead</p>
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
		const address = ref('')
		const telNumber = ref('')
		const institution = ref('')
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
					address: address.value,
					telNumber: telNumber.value,
					institution: institution.value,
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
							address,
							telNumber,
							institution,
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

	.ext-link {
		margin: 25px;
	}

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

	.form-name-fields, .form-password-fields {
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		width: 100%;
		box-sizing: border-box;
	}

</style>