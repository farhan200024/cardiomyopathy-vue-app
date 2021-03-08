<template>
	<div class="email-verification-card">
		<p>A verification Email has be sent at:</p>
		<h1>{{ getUser.email }}</h1>
		<p>Please verify your email to use this service.</p>
		<div class="email-resend-wrapper" >
			<button v-if="!verificationEmailSent" @click="resendEmailVerification" class="success" >Resend Verification Email</button>
			<p v-else >Email Verification Sent!</p>
		</div>
	</div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
	setup() {
		const verificationEmailSent = ref(false)
		const store = useStore()
		const getUser = computed(() => {
			return store.getters.getUser
		})

		const resendEmailVerification = async () => {
			await getUser.value.sendEmailVerification();
			verificationEmailSent.value = true
		}

		console.log(getUser.value)

		return {
			getUser,
			resendEmailVerification,
			verificationEmailSent
		}
	}
}
</script>

<style>
	.email-verification-card {
		height: 500px;
		padding: 10vh;
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

	.email-resend-wrapper {
		padding: 20px;
		color: green;
	}
</style>