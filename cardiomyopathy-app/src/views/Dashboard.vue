<template>
	<div>
		<div class="form">
			<h1>Dashboard</h1>
			<input type="text" placeholder="Line Name" v-model="lineName">
			<input type="file" @change="parseFile" accept=".csv">
			<button @click="saveData" >Save</button>
			<p v-if="error">{{ error }}</p>
		</div>

		<div v-if="retrievedPosts">
			<h1>Posts</h1>
			<div v-for="post in retrievedPosts" :key="post.id" class="posts-container" >
				<div class="posts">
					<h3>{{ post.name }}</h3>
				</div>
				<div class="action-buttons-test">
					<input type="checkbox" @change="addSeriesToArray($event, post)">
					<span @click="deleteItem(post.id)" class="material-icons delete-button">delete</span>
				</div>
			</div>
			<button @click="displayChart" >Display Chart</button>
		</div>

		<div v-if="showChart && series.length !== 0">
			<LineChart :series="series"/>
		</div>
		<button @click="debugDashboard">Debug Dashboard</button>
	</div>
</template>

<script>
import { computed, ref } from 'vue'
import LineChart from '../components/LineChart'
import useParseCsvToJson from '../composables/useParseCsvToJson'
import useDAO from '../composables/useDAO'
import { useStore } from 'vuex'

export default {
	components: { LineChart },
	setup() {
		const { parseFile, data } = useParseCsvToJson()
		const { addPost, error, retrievePosts, retrievedPosts, deletePost } = useDAO()
		const lineName = ref()
		const line = ref(null)
		const series = ref([])
		const store = useStore()
		const showChart = ref(false)

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

			console.log(series.value)
		}

		const displayChart = () => {
			showChart.value = !showChart.value
		}

		const getUser = computed(() => {
			return store.getters.getUser
		})

		retrievePosts(getUser.value.uid)


		const saveData = async () => {
			line.value = null
			console.log(line.value)
			line.value = {
				name: lineName.value,
				data: JSON.stringify(data.value)
			}
			// test = JSON.parse(test)
			
			console.log(getUser)
			await addPost(getUser.value.uid, line.value)
			if(error.value === null) {
				//console.log("The data has been saved")
				return error.value = "Data has been saved"
			} else {
				return error.value = "There was an error, could not save the data"
			}
			
		}

		const debugDashboard = () => {
			console.log()
		}

		return {
			saveData,
			lineName,
			parseFile,
			retrievedPosts,
			error,
			showChart,
			addSeriesToArray,
			series,
			displayChart,
			debugDashboard,
			deleteItem
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
		width: 300px;
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