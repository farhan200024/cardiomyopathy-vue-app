<template>
	<div class="accordion-container">
		<button @click="handleClick" class="accordion" :class="{active: isActive }">
			<slot name="button"></slot>
		</button>
		<div ref="panel" class="panel" >
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
export default {
	setup() {
		const isActive = ref(false)
		const panel = ref(null)

		const handleClick = () => {
			isActive.value = !isActive.value
			if(panel.value.style.maxHeight) {
				panel.value.style.maxHeight = null;
			} else {
				panel.value.style.maxHeight = panel.value.scrollHeight + "px";
			}
		}

		return {
			handleClick,
			isActive,
			panel
		}
	}
}
</script>

<style>
	.accordion-container {
		text-align: left;
		margin: 0 auto;
	}

	/* Style the buttons that are used to open and close the accordion panel */
	.accordion {
		background-color: #eee;
		width: 100%;
		color: #444;
		cursor: pointer;
		padding: 18px;
		text-align: left;
		border: none;
		outline: none;
		transition: 0.4s;
	}

	/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
	.active, .accordion:hover {
		background-color: #ccc;
	}

	/* Style the accordion panel. Note: hidden by default */
	.panel {
		margin: 25px;
		background-color: white;
		max-height: 0;
		overflow: auto;
		transition: max-height 0.5s ease-out;
	}

	.accordion:after {
		content: '\02795'; /* Unicode character for "plus" sign (+) */
		font-size: 24px;
		color: #777;
		float: right;
		margin-left: 5px;
	}

	.active:after {
		content: "\2796"; /* Unicode character for "minus" sign (-) */
	}
</style>