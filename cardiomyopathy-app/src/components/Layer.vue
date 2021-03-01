<template>
	<div class="layer">
		<div class="layer-container">
			<slot name="content"></slot>
			<button class="layer-button danger" @click="handleClick" >Close</button>
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

<style>
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
	}
	.layer-container .layer-button {
		margin-top: 40px;
	}
</style>