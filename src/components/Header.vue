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
			<router-link :to="{ name: 'Search' }">Search Data</router-link>
			<router-link v-if="isUserAuth" :to="{ name: 'Dashboard' }">Dashboard</router-link>
			<router-link v-if="isUserAuth" :to="{ name: 'CardiomyopathyData' }">Data</router-link>
			<router-link :to="{ name: 'Help' }">Help</router-link>
		</nav>
		<div class="mobile-nav" >
			<router-link class="polyline" :to="{ name: 'Home' }">
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">
					<polyline fill="none" stroke="green" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
					/>
				</svg>
			</router-link>
			<h2>Cardiomyopathy App</h2>
			<span class="burger-menu" style="font-size:30px; cursor:pointer" @click="openNav">&#9776;</span>
			<nav id="myNav" ref="mobileNav" class="overlay">
				<span class="closebtn" @click="closeNav">&times;</span>
				<div class="overlay-content">
					<router-link :to="{ name: 'Home' }" @click="closeNav">Home</router-link>
					<router-link :to="{ name: 'Search' }" @click="closeNav">Search Data</router-link>
					<router-link v-if="isUserAuth" :to="{ name: 'Dashboard' }" @click="closeNav">Dashboard</router-link>
					<router-link v-if="isUserAuth" :to="{ name: 'CardiomyopathyData' }" @click="closeNav">Data</router-link>
					<router-link v-if="!isUserAuth" :to="{ name: 'Login' }" @click="closeNav">Login</router-link>
					<router-link v-if="!isUserAuth" :to="{ name: 'Register' }" @click="closeNav">Register</router-link>
					<p v-if="isUserAuth" @click="closeNav(); signOut();">Logout</p>
					<router-link :to="{ name: 'Help' }" @click="closeNav">Help</router-link>
				</div>
			</nav>
		</div>
	</header>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
	setup() {
		const store = useStore()
		const mobileNav = ref(null)

		const getUser = computed(() => {
			// console.log(store.getters.getUser)
			return store.getters.getUser
		})

		const isUserAuth = computed(() => {
			// console.log(store.getters.isUserAuth)
			return store.getters.isUserAuth
		})

		const signOut = () => {
			store.dispatch('signOutAction')
		}
		
		const openNav = () => {
			console.log(mobileNav.value)
			mobileNav.value.style.width = '100%'
		}

		const closeNav = async () => {
			mobileNav.value.style.width = '0'
		}

		return {
			getUser,
			isUserAuth,
			signOut,
			mobileNav,
			openNav,
			closeNav
		}
	}

}
</script>

<style>

	header {
		background: white;
		border-bottom: 1px solid #dfdfdf;
		width: 100vw;
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
		max-width: 1150px;
		margin: 0 auto;
		padding: 10px;
		text-align: left;
	}

	.navbar a {
		cursor: pointer;
		font-size: 24px;
		text-decoration: none;
		color: black;
		padding: 8px 16px;
	}

	.navbar a:hover {
		background: #dfdfdf;
	}

	.navbar a.router-link-active {
		font-weight: bold;
		text-decoration: underline;
	}

	.polyline {
		margin: 10px;
		cursor: pointer;
	}

	.polyline svg {
		width: 125px;
		height: 61px;
	}

	/* mobile nav */

	/* The Overlay (background) */
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */   
  height: 100%;
  width: 0;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(0,0,0); /* Black fallback color */
  background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s;
	display: none;
}

/* Position the content inside the overlay */
.overlay-content {
  position: relative;
  top: 25%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
}

/* The navigation links inside the overlay */
.overlay a, .overlay p {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block; /* Display block instead of inline */
  transition: 0.3s; /* Transition effects on hover (color) */
}

/* When you mouse over the navigation links, change their color */
.overlay a:hover, .overlay a:focus, .overlay p:hover, .overlay p:focus {
  color: #f1f1f1;
	cursor: pointer;
}

/* Position the close button (top right corner) */
.overlay .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
	color: white;
	cursor: pointer;
}

.mobile-nav {
	display: none;
	justify-content: space-around;
	align-items: center;
	padding: 25px 0;
	margin: 0;
	width: 100vw;
}

@media screen and (max-width: 600px) {

	.mobile-nav {
		display: flex;
	}

	.navbar, .wrapper {
		display: none;
	}
	.overlay {
		display: block;
	}

	.polyline svg {
		width: 75px;
		height: 37px;
	}
}

@media screen and (max-width: 465px) {
	.mobile-nav h2 {
		display: none;
	}

	.polyline svg {
		justify-self: center;
	}
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
@media screen and (max-height: 450px) {
  .overlay a {font-size: 20px}
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}

</style>