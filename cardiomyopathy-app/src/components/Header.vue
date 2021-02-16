<template>
	<header>
		<div class="wrapper">
			<h1>Logo</h1>

			<div>
				<router-link :to="{ name: 'Login' }"><button class="login" >Login</button></router-link>
				<router-link :to="{ name: 'Register' }" ><button class="register" >Register</button></router-link>
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
	
	.login, .register{
		cursor: pointer;
		margin: 5px;
		background: rgba(0, 120, 215, .8);
		font-weight: bold;
		color: white;
		border: none;
		padding: 8px 16px;
		font-size: 18px;
	}

	.login:hover {
		background: blue;
	}

	.register {
		background: #5ae4ca;
	}

	.register:hover {
		background: green;
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

</style>