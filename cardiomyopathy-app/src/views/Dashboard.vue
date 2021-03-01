<template>
	<div>
		<div v-if="retrievedPosts" class="dashboard-container">
			<h1>Graph Data</h1>
			<p v-if="message" class="message">{{ message }}</p>
			<p v-if="error">{{ error }}</p>
			<button @click="addItem" class="success add-button">Add Data</button>
			<div v-for="post in retrievedPosts" :key="post.id" class="posts-container" >
				<div class="posts">
					<h3>{{ post.title }}</h3>
				</div>
				<div class="action-buttons">
					<input type="checkbox" @change="addSeriesToArray($event, post)" class="checkbox" >
					<span @click="updateItem(post)" class="material-icons edit-button">edit</span>
					<span @click="deleteItem(post.id)" class="material-icons delete-button">delete</span>
				</div>
			</div>
			<button @click="displayChart" class="primary" >Display Chart</button>
		</div>
		<Layer v-if="action" @close="action = ''">
			<template v-slot:content>
				<GraphDataForm :action="action" :graphPost="updatePost" @close="onSuccess"/>
			</template>
		</Layer>

		<Layer v-if="showChart && series.length !== 0" @close="showChart = !showChart" >
			<template v-slot:content>
				<LineChart :series="series"/>
			</template>
		</Layer>
	</div>
</template>

<script>
import { computed, ref } from 'vue'
import LineChart from '../components/LineChart'
import useDAO from '../composables/useDAO'
import { useStore } from 'vuex'
import Layer from '../components/Layer.vue'
import GraphDataForm from '../components/GraphDataForm.vue'

export default {
	components: { LineChart, Layer, GraphDataForm },
	setup() {
		const { error, retrievePosts, retrievedPosts, deletePost } = useDAO()
		const series = ref([])
		const store = useStore()
		const showChart = ref(false)
		const updatePost = ref(null)
		const action = ref('')
		const message = ref('')

		const onSuccess = (resp) => {
			action.value = ''
			message.value = resp
		}

		const addItem = () => {
			action.value = 'add'
			updatePost.value = null
		}

		const updateItem = (thisPost) => {
			updatePost.value = thisPost
			action.value = 'update'
		}

		const deleteItem = async (postID) => {
			let success = null
			success = await deletePost(getUser.value.uid, postID)

			console.log(success)
		}
		
		const addSeriesToArray = (e, post) => {
			// console.log(post)
			if(e.target.checked) {
				series.value.push(post)
			} else {
				console.log(post.id)
				series.value = series.value.filter(line => {
					if(line.id != post.id) {
						return line;
					}
				})
			}
		}

		const displayChart = () => {
			showChart.value = !showChart.value
		}

		const getUser = computed(() => {
			return store.getters.getUser
		})

		retrievePosts(getUser.value.uid)

		return {
			retrievedPosts,
			error,
			showChart,
			addSeriesToArray,
			series,
			displayChart,
			deleteItem,
			action,
			updateItem,
			updatePost,
			addItem,
			onSuccess,
			message
		}
	}
}
</script>

<style>
	.posts-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		width: 600px;
	}

	.data-form {
		width: 500px;
		margin: 10px auto;
	}

	.data-form h1 {
		font-size: 48px;
	}

	.data-form label {
		display: block;
		padding-left: 10px;
		text-align: left;
		font-weight: bold;
		font-size: 18px;
	}

	.data-form input {
		width: 100%;
		padding: 10px;
		border-radius: 20px;
		font-size: 18px;
		border: 1px solid rgb(173, 173, 173);
		outline: none;
		color: #999;
		margin: 20px auto;
		margin-top: 0;
	}

	.data-form input:focus {
		border: 1px solid black;
	}

</style>