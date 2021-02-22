<template>
	<h1 v-if="isUserAuth">Welcome, {{ getUser.displayName }}!</h1>
	<HeartPulse v-if="loading" />
	<button @click="handleClick" class="danger" >Click Me!</button>
</template>

<script>
import { computed, ref } from 'vue'
import HeartPulse from '../components/HeartPulse'
import { useStore } from 'vuex'

export default {
	components: { HeartPulse },
	setup() {
		const loading = ref(false)
		const store = useStore()

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

		return { loading, handleClick, getUser, isUserAuth }
	}
}
</script>

<style>

</style>