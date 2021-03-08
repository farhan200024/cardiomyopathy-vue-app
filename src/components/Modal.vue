<template>
	<div class="modal" @click="emitCancel">
		<span  class="close">&times;</span>
		<div class="modal-content-form">
			<div class="modal-info" @click.stop>
				<div class="modal-info-wrapper" >
					<h1>Delete Post</h1>
					<p>Are you sure you want to delete this post?</p>
					<div class="modal-buttons">
						<button type="button" class="cancelbtn" @click="emitCancel" >Cancel</button>
						<button type="button" class="deletebtn" @click="emitDelete" >{{ actionToPerform }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
	props: ['actionToPerform'],
	setup(props, context) {

		const selectedAction = ref('')

		const emitDelete = () => {
			selectedAction.value = 'delete'
			context.emit('performSelectedAction', selectedAction)
			selectedAction.value = ''
		}

		const emitCancel = () => {
			selectedAction.value = 'cancel'
			context.emit('performSelectedAction', selectedAction)
			selectedAction.value = ''
		}

		return {
			emitDelete,
			emitCancel
		}
	}

}
</script>

<style scoped>

	.modal {
		margin: 0;
		position: fixed; 
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(223, 223, 223, 0.2)
	}

	.close {
		position: absolute;
		right: 35px;
		top: 15px;
		font-size: 40px;
		font-weight: bold;
		color: #f1f1f1;
	}

	.modal-content-form {
		display: flex;
		height: 100%;
	}

	.modal-info {
		width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}

	.modal-info-wrapper {
		cursor: initial;
		padding: 20px;
		background: white;
	}

	.modal-info-wrapper p {
		margin: 10px 0;
	}

	.modal-buttons .cancelbtn, .modal-buttons .deletebtn {
		background-color: red;
		font-size: 18px;
		color: white;
		padding: 14px 20px;
		margin: 8px;
		border: none;
		width: 100%;
		opacity: 0.9;
	}

	.modal-buttons button:hover {
		cursor: pointer;
	}

	.modal-buttons .cancelbtn {
		background-color: #696969;
	}

	@media screen and (max-width: 300px) {
		.cancelbtn, .deletebtn {
			width: 100%;
		}
	}
</style>