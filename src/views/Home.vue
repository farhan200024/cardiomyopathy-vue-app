<template>
	<div class="welcome-message">
		<h2>Welcome to the</h2>
		<h1>Cardiomyopathy App</h1>
	</div>
	<div v-if="!isUserAuth" class="home-container">
		<div class="welcome-wrapper">
			<h2>This website has a range of data on cardiomyopathy and <br> mutations.</h2>
			<h3>
				You can sign up or login to use different tools and <br> get information on a range of
				cardiomyopathies and mutations.
			</h3>
			<form @submit.prevent="redirectToRegister" class="welcome-home-form">
				<input type="email" required placeholder="Email" v-model="email">
				<button class="success" >Sign Up - It's free</button>
			</form>
		</div>
	</div>
	<div v-else >
		<div id="user-welcome-container">
			<p>You are currently logged in as</p>
			<h2>{{ getUser.displayName }}</h2>
			<p id="wrong-user-message" class="ext-link" >Not you? <span @click="logoutAndRedirectToLogin">Log out</span></p>
		</div>
	</div>
	<NewsFeed />
</template>

<script>
import { computed, ref } from 'vue'
// import HeartPulse from '../components/HeartPulse'
import NewsFeed from '../components/NewsFeed'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
	components: { NewsFeed },
	setup() {
		const loading = ref(false)
		const store = useStore()
		const email = ref('')
		const router = useRouter()

		const getUser = computed(() => {
			return store.getters.getUser
		})

		const logoutAndRedirectToLogin = () => {
			store.dispatch('signOutAction')
		}

		const isUserAuth = computed(() => {
			return store.getters.isUserAuth
		})

		const handleClick = () => {
			console.log(getUser)
			loading.value = !loading.value;
		}

		const redirectToRegister = () => {
			router.push({
				name: 'Register',
				params: {
					email: email.value
				}
			})
		}

		return {
			loading,
			handleClick,
			getUser,
			isUserAuth,
			email,
			redirectToRegister,
			logoutAndRedirectToLogin
		}
	}
}
</script>

<style>

	.welcome-message {
		display: flex;
		flex-direction: column;
	}

	.welcome-message h1 {
		font-size: 3.5vw;
		color: green;
		border-bottom: none;
	}

	.welcome-message h2 {
		margin-top: 25px;
		font-size: 2.7vw;
	}

	.home-container {
		width: 100%;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 40px;
	}

	#user-welcome-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 40px;
		height: 200px;
	}

	#user-welcome-container h2 {
		font-size: 2.5vw;
	}

	.home-container h1 {
		text-align: center;
		/* margin: 40px 0 20px 0; */
		display: block;
	}

	.welcome-wrapper {
		width: 80%;
		margin: 0 auto;
	}

	.welcome-wrapper h2 {
		font-size: 2.5vw;
		border: none;
	}

	.welcome-wrapper h3 {
		font-size: 1.9vw;
		margin: 10px 0;
		border: none;
	}

	.welcome-home-form {
		display: flex;
		width: 60vw;
		padding: 20px 0;
	}

	.welcome-home-form input {
		width: 100%;
		padding: 20px;
		border-radius: 20px;
		font-size: 18px;
		border: 1px solid rgb(173, 173, 173);
		outline: none;
		display: inline;
	}

	.welcome-home-form button {
		display: inline;
		margin: 0;
		padding: 0;
		width: 300px;
		margin-left: 10px;
	}

	#wrong-user-message {
		margin: 0;
		padding: 0;
	}

	@media screen and (max-width: 600px) {

		.welcome-message h1 {
			font-size: 10vw;
		}

		.welcome-message h2 {
			font-size: 5.9vw;
		}

		.welcome-wrapper h2 {
			font-size: 5vw;
			border: none;
		}

		.welcome-wrapper h3 {
			font-size: 4.5vw;
			margin: 10px 0;
			border: none;
		}

		.welcome-message {
			box-sizing: border-box;
			padding: 20px;
		}

		.home-container {
			padding: 0;
		}

		.welcome-home-form {
			width: 100%;
		}

		.welcome-home-form input {
			padding: 10px;
			font-size: 4.2vw;
		}

		.welcome-home-form .success {
			font-size: 4.2vw;
		}

		#user-welcome-container {
			padding: 5px 0;
		}

		#user-welcome-container h2 {
			font-size: 7.5vw;
		}

	}
</style>