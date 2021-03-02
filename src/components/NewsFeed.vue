<template>
	<h1>News Feed!</h1>
	<button @click="handleClick">Fetch</button>
</template>

<script>
// import axios from 'axios'
export default {
	
	setup() {
		
		const handleClick = async () => {
			console.log("I work")
			let response = await fetch('https://www.news-medical.net/tag/feed/Cardiomyopathy.aspx', {
				mode: 'cors',
				headers: {
					'Accept': 'text/xml',
					'Access-Control-Allow-Origin': 'http://localhost:8080/'
				}
			})
			console.log(response)
		}

		return {
			handleClick
		}
	}
}
</script>

<style>

</style>