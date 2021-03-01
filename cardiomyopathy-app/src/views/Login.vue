<template>

	<form v-if="!forgottenPassword" @submit.prevent="signInAction" class="form">
    <h1>Login</h1>
		<div v-if="emailVerificationSent" class="bubble" >
			<p>{{ emailVerificationSent }}</p><p @click="emailVerificationSent = null" >X</p>
		</div>
		<input type="email" required placeholder="Email" v-model="email">
		<input type="password" required placeholder="Password" v-model="password">
		<p class="reset-password" @click="forgottenPassword = !forgottenPassword" >Forgotten Password?</p>
		<div class="error">{{ error }}</div>
		<button class="primary" >Log In</button>
		<p>No account yet? <span  @click="showSignup">Register</span> instead</p>
	</form>

	<form v-else @submit.prevent="handleResetPassword" class="form">
		<h1>Reset Password</h1>
		<p>Please enter your email address to reset your password.</p>
		<input type="email" required placeholder="Email" v-model="email">
		<div class="error" v-if="resetPasswordError">{{ resetPasswordError }}</div>
		<button class="danger" >Reset Password</button>
		<button class="warning" @click.prevent="forgottenPassword = !forgottenPassword"  >Cancel</button>
	</form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'
import useResetPassword from '../composables/useResetPassword'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	setup() {
		const router = useRouter()
		const store = useStore()

		// refs
		const email = ref('')
		const password = ref('')
		const forgottenPassword = ref(false)
		const emailVerificationSent = ref(null)

		const { error, /*login*/ } = useLogin()
		const { resetPasswordError, resetPassword } = useResetPassword()

		// const handleLogin = async  () => {
		// 	await login(email.value, password.value)
		// 	if(!error.value) {
		// 		console.log('user logged in')
		// 		context.emit("login")
		// 	}
		// }

		const handleResetPassword = async () => {
			await resetPassword(email.value)
			if(!resetPasswordError.value) {
				console.log('password reset email sent')
				forgottenPassword.value = !forgottenPassword.value
				emailVerificationSent.value = 'Please check your email to reset your password. Email sent to ' + email.value
				//router.push({ name: 'Login' })
			}

		}

		const signInAction = () => {
			store.dispatch('signInAction', { email: email.value, password: password.value })
		}

		const showSignup = () => {
			router.push({ name: 'Register' })
		}

		return { 	email, 
							password,
							signInAction ,
							// handleLogin, 
							error,
							resetPasswordError,
							showSignup, 
							forgottenPassword, 
							handleResetPassword,
							emailVerificationSent }
	}
}
</script>

<style>
	.reset-password {
		margin-bottom: 20px;
		font-weight: bold;
		text-decoration: underline;
		cursor: pointer;
	}

	.bubble {
		background: rgba(220, 0, 0, 0.1);
		display: flex;
		align-items: center;
	}

	.bubble p:nth-child(2) {
		margin: 20px;
		cursor: pointer;
		font-size: 25px;
	}

	.bubble p:nth-child(2):hover {
		font-weight: bold;
	}
</style>