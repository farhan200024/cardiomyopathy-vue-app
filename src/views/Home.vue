<template>
	<div v-if="!isUserAuth" class="home-container">
	<h1>Cardiomyopathy App</h1>
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
			redirectToRegister
		}
	}
}
</script>

<style>
	.home-container {
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		min-height: 70vh;
	}

	.home-container h1 {
		text-align: center;
		margin: 40px 0 20px 0;
		display: block;
	}

	.welcome-wrapper {
		width: 80%;
		margin: 0 auto;
	}

	.welcome-wrapper h2 {
		font-size: 42px;
		border: none;
	}

	.welcome-wrapper h3 {
		font-size: 24px;
		margin: 10px 0;
		border: none;
	}

	.welcome-home-form {
		display: flex;
		width: 600px;
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
</style>