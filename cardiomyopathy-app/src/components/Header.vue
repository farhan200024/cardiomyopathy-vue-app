<template>
	<header>
		<div class="wrapper">
			<router-link class="polyline" :to="{ name: 'Home' }">
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">
					<polyline fill="none" stroke="green" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
					/>
				</svg>
			</router-link>
			

			<div v-if="!isUserAuth">
				<router-link :to="{ name: 'Login' }"><button class="primary" >Login</button></router-link>
				<router-link :to="{ name: 'Register' }" ><button class="success" >Register</button></router-link>
			</div>
			<div v-else @click="signOut">
				<button class="danger">Logout</button>
			</div>
		</div>

		<nav class="navbar">
			<router-link :to="{ name: 'Home' }">Home</router-link>
		</nav>
	</header>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
	setup() {
		const store = useStore()

		const getUser = computed(() => {
			console.log(store.getters.getUser)
			return store.getters.getUser
		})

		const isUserAuth = computed(() => {
			console.log(store.getters.isUserAuth)
			return store.getters.isUserAuth
		})

		const signOut = () => {
			store.dispatch('signOutAction')
		}
		

		return {
			getUser,
			isUserAuth,
			signOut
		}
	}

}
</script>

<style>

	header {
		background: white;
	}

	.wrapper {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		padding: 5px;
		justify-content: space-between;
		align-items: center;
	}

	header .wrapper {
		color: #dfdfdf;
	}

	.navbar {
		max-width: 1200px;
		margin: 0 auto;
		padding: 10px;
	}

	.navbar a {
		cursor: pointer;
		font-size: 24px;
		text-decoration: none;
		margin-left: 20px;
		color: black;
		padding: 8px 16px;
	}

	.navbar a:hover {
		background: #dfdfdf;
		font-weight: bold;
	}

	.navbar a.router-link-active {
		font-weight: bold;
		background: #dfdfdf;
	}

	.polyline {
		/* border: 1px solid black; */
		margin: 10px;
		cursor: pointer;
	}

	.polyline svg {
		width: 125px;
		height: 61px;
	}

</style>