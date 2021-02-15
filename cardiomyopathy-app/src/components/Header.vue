<template>
	<header>
		<div class="wrapper">
			<h1>Logo</h1>

			<div>
				<button class="login" >Login</button>
				<button class="signup" >Signup</button>
			</div>
		</div>

		<nav class="navbar">
			<router-link :to="{ name: 'Home' }">Home</router-link>
		</nav>
	</header>
</template>

<script>
export default {

}
</script>

<style>

	header {
		background: crimson;
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
	
	.login, .signup{
		cursor: pointer;
		margin: 5px;
		background: rgba(0, 120, 215, .8);
		font-weight: bold;
		color: white;
		border: none;
		padding: 8px 16px;
		font-size: 18px;
	}

	.signup {
		background: #5ae4ca;
	}

	.navbar {
		max-width: 1200px;
		margin: 0 auto;
		padding: 5px;
	}

	.navbar a {
		font-size: 24px;
		text-decoration: none;
		margin-left: 20px;
		color: white;
	}

	.navbar a.router-link-active {
		font-weight: bold;
	}

</style>