<template>
	<form @submit.prevent="signUpAction">
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
		<MessageBubble v-if="error" :message="error" @close="toggleErrorState" />
		<button class="success">Register</button>
		<p class="ext-link" >Already registered? <span  @click="showLogin">Login</span> instead</p>
	</form>
</template>

<script>
import { computed, ref } from 'vue'
import MessageBubble from '../components/MessageBubble.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { timestamp } from '../firebase/config'

export default {
	components: { MessageBubble },
	setup() {
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

		const toggleErrorState = () => {
			store.commit("setError", null)
		}

		const error = computed(() => {
			return store.getters.getError
		})

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
							showLogin,
							signUpAction,
							toggleErrorState,
							error
						}
	}
}
</script>

<style>

	.ext-link {
		margin: 25px;
	}

	.form-name-fields, .form-password-fields {
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		width: 100%;
		box-sizing: border-box;
	}

</style>