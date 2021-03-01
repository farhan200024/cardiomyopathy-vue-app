<template>
	<div class="layer">
		<div class="layer-container">
			<button @click="handleClick" ><span id="layer-button" class="material-icons">close</span></button>
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
export default {
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

<style scoped>
	.layer {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		text-align: center;
		background: rgb(176,176,176,0.7);
	}

	.layer-container {
		width: 80%;
		height: 80%;
		background: white;display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
	}

	.layer-container button {
		border: none;
		padding: 0;
		margin: 0;
		background: white;
	}

	#layer-button {
		margin: 0;
		padding: 0;
		border: none;
		background: white;
		font-size: 42px;
		display: block;
		position: absolute;
		top: 20px;
		right: 20px;
	}

	#layer-button:hover {
		color: red;
		cursor: pointer;
	}
</style>