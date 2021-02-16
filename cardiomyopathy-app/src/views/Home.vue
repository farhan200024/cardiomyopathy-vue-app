<template>
	<h1>Home</h1>
	<HeartPulse v-if="loading" />
	<button @click="handleClick">Click Me!</button>
</template>

<script>
import { ref } from 'vue'
import HeartPulse from '../components/HeartPulse'

export default {
	components: { HeartPulse },
	setup() {
		const loading = ref(false)

		const handleClick = () => {
			loading.value = !loading.value;
		}

		return { loading, handleClick }
	}
}
</script>

<style>

</style>