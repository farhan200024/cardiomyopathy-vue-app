<template>
	<div class="data-form">
		<!-- action is save data or update data variable -->
		<h1>{{ action.charAt(0).toUpperCase() + action.substr(1, action.length) }}</h1>
		<input type="text" placeholder="Title" v-model="post.title"  required>
		<input type="file" @change="parseFile" accept=".csv" required>
		<input type="text" placeholder="Cardiomyopathy Type" v-model="post.cardiomyopathyType" required>
		<input type="text" placeholder="Mutation Type" v-model="post.mutationName" required>
		<input type="text" placeholder="Y Axis Title" v-model="post.yTitle" required>
		<input type="text" placeholder="X Axis Title" v-model="post.xTitle" required>
		<button @click="saveData" class="success" >{{ action.charAt(0).toUpperCase() + action.substr(1, action.length) }}</button>
		<MessageBubble v-if="error" :message="error" @close="error = null" />
	</div>
</template>

<script>
import { computed, ref } from 'vue'
import { timestamp } from '../firebase/config'
import useParseCsvToJson from '../composables/useParseCsvToJson'
import useDAO from '../composables/useDAO'
import MessageBubble from '../components/MessageBubble.vue'
import { useStore } from 'vuex'

export default {
	components: { MessageBubble },
	props: [ 'action', 'graphPost' ],
	setup(props, context) {
		const { parseFile, data } = useParseCsvToJson()
		const store = useStore()
		const { addPost, updatePost, error } = useDAO()
		const post = ref(null)
		const line = ref(null)

		if(props.graphPost) {
			post.value = {
				title: props.graphPost.title,
				data: [],
				cardiomyopathyType: props.graphPost.cardiomyopathyType,
				mutationName: props.graphPost.mutationName,
				yTitle: props.graphPost.yTitle,
				xTitle: props.graphPost.xTitle
			}
		} else {
			post.value = {
				title: '',
				data: [],
				cardiomyopathyType: '',
				mutationName: '',
				yTitle: '',
				xTitle: ''
			}
		}

		const saveData = async () => {
			line.value = null
			if(data.value.length !== 0) {
				data.value = JSON.stringify(data.value)
			} else {
				data.value = []
			}

			line.value = {
				title: post.value.title,
				data: data.value,
				cardiomyopathyType: post.value.cardiomyopathyType,
				mutationName: post.value.mutationName,
				yTitle: post.value.yTitle,
				xTitle: post.value.xTitle,
				lastModified: timestamp(),
				createdAt: timestamp()
			}
			
			if(props.action === 'add') {
				await addPost(getUser.value.uid, line.value)
				if(error.value === null) {
						context.emit('close', "Data saved successfully")
				} else {
					return error.value = "There was an error, could not save the data"
				}
			} else if (props.action === 'update') {
				delete line.value.createdAt
				if(line.value.data.length === 0) {
					delete line.value.data
				}
				await updatePost(getUser.value.uid, line.value, props.graphPost.id)
				if(error.value === null) {
						context.emit('close', "Data updated successfully")
				} else {
					return error.value = "There was an error, could not save the data"
				}
			}
		}

		const getUser = computed(() => {
			return store.getters.getUser
		})

		return {
			parseFile,
			saveData,
			post,
			error
		}
	}
}
</script>

<style>

</style>