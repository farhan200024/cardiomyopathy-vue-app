<template>
	<div class="tooltip-wrapper" >
		<div class="tooltip">
			<div class="tooltip-content" >
				<slot name="icon"></slot>
				<span class="tooltiptext">
					<slot name="content"></slot>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
	.tooltip-wrapper  {
		text-align: left;
		margin-left: 20px;
	}

	.tooltip {
		position: relative;
		display: inline-block;
		/* border-bottom: 1px dotted black; */
	}

	/* Tooltip text */
	.tooltip .tooltiptext {
		visibility: hidden;
		min-width: 400px;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;
		border: 1px solid black;
	
		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
	}

	.tooltip .tooltiptext {
		width: 120px;
		top: 100%;
		left: 50%;
		margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
	}

	.tooltip .tooltiptext::after {
		content: " ";
		position: absolute;
		bottom: 100%;  /* At the top of the tooltip */
		left: 15%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent black transparent;
	}

	.tooltip-content {
		margin-top: 5px;
		cursor: pointer;
	}

	#image img {
		display: block;
		width: 50px !important;
		height: 50px im !important;
	}

</style>