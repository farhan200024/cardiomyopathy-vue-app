<template>
	<h1>Line Chart</h1>
	<input type="file" @change="onFileUpload" accept=".csv">
	<button >Generate Chart</button>
</template>

<script>
import useParseCsvToJson from '../composables/useParseCsvToJson'

export default {
	setup() {
		const { onFileUpload } = useParseCsvToJson()

		return {
			onFileUpload
		}
	}
}
</script>

<style>

</style>