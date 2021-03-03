<template>
	<div class="bubble" >
		<div v-if="message" class="bubble-wrapper">
			<p>{{ message }}</p><p @click="handleClick" >X</p>
		</div>
	</div>
</template>

<script>

export default {
	props: ['message'],
	setup(props, context) {

		const handleClick = () => {
			context.emit('close')
		}

		return {
			handleClick
		}
	}
}
</script>

<style>

	.bubble {
		display: flex;
		justify-content: center;
		margin: 10px;
	}

	.bubble-wrapper {
		background: rgba(220, 0, 0, 0.1);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 275px;
	}

	.bubble p:nth-child(1) {
		margin: 15px 0 15px 20px;
		font-weight: bold;
	}

	.bubble p:nth-child(2) {
		cursor: pointer;
		font-size: 25px;
		margin: 0 20px 0 20px;
	}

	.bubble p:nth-child(2):hover {
		font-weight: bold;
		color: red;
	}
</style>