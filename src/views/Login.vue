<template>
	<div class="login-container">
		<form v-if="!forgottenPassword" @submit.prevent="signInAction">
			<div class="form">
				<h1>Login</h1>
				<input type="email" required placeholder="Email" v-model="email">
				<input type="password" required placeholder="Password" v-model="password">
				<p class="reset-password" @click="forgottenPassword = !forgottenPassword" >Forgotten Password?</p>
			</div>
			<MessageBubble v-if="error" :message="error" @close="toggleErrorState" />
			<button class="primary" >Log In</button>
			<p class="ext-link">No account yet? <span  @click="showSignup">Register</span> instead</p>
		</form>

		<form v-else @submit.prevent="handleResetPassword">
			<div class="form">
				<h1>Reset Password</h1>
				<p>Please enter your email address to reset your password.</p>
				<input type="email" required placeholder="Email" v-model="email">
			</div>
			<div class="error" v-if="resetPasswordError">{{ resetPasswordError }}</div>
			<button class="danger" >Reset Password</button>
			<button class="warning" @click.prevent="forgottenPassword = !forgottenPassword"  >Cancel</button>
		</form>
	</div>
</template>

<script>
import { computed, ref } from 'vue'
import useResetPassword from '../composables/useResetPassword'
import MessageBubble from '../components/MessageBubble.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	components: { MessageBubble },
	setup() {
		const router = useRouter()
		const store = useStore()

		// refs
		const email = ref('')
		const password = ref('')
		const forgottenPassword = ref(false)
		const emailVerificationSent = ref(null)
		const { resetPasswordError, resetPassword } = useResetPassword()

		const handleResetPassword = async () => {
			await resetPassword(email.value)
			if(!resetPasswordError.value) {
				console.log('password reset email sent')
				forgottenPassword.value = !forgottenPassword.value
				emailVerificationSent.value = 'Please check your email to reset your password. Email sent to ' + email.value
				//router.push({ name: 'Login' })
			}

		}

		const toggleErrorState = () => {
			store.commit("setError", null)
		}

		const error = computed(() => {
			return store.getters.getError
		})

		const signInAction = () => {
			store.dispatch('signInAction', { email: email.value, password: password.value })
		}

		const showSignup = () => {
			router.push({ name: 'Register' })
		}

		return { 	email, 
							password,
							signInAction ,
							resetPasswordError,
							showSignup, 
							forgottenPassword, 
							handleResetPassword,
							emailVerificationSent,
							toggleErrorState,
							error
						}
	}
}
</script>

<style>

	.login-container {
		min-height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.reset-password {
		margin-bottom: 20px;
		font-weight: bold;
		text-decoration: underline;
	}

	.reset-password:hover {
		cursor: pointer;
		color: red;
	}
</style>