<template>
	<div>
		<h1>Posts</h1>
		<div v-if="retrievedPosts">
			<table>
				<tr>
					<th>Line</th>
					<th>Categories</th>
					<th>Actions</th>
				</tr>
				<tr v-for="post in retrievedPosts" :key="post.id" >
					<td>
						<p>{{ post.name }}</p>
					</td>
					<td>Category</td>
					<td class="action-buttons">
						<span @click="displayChart(post)" class="material-icons chart-button">stacked_bar_chart</span>
						<span @click="deleteItem(post.id)" class="material-icons delete-button">delete</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="chart-layer" v-if="showChart">
		<div v-if="showChart && series.length !== 0" class="chart-container">
			<LineChart :series="series"/>
			<button class="chart-button" @click="showChart = !showChart">Close</button>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import useDAO from '../composables/useDAO'
import LineChart from '../components/LineChart'

export default {
	components: { LineChart },
	setup() {
		const { error, retrieveAllPosts, retrievedPosts } = useDAO()
		retrieveAllPosts()

		const showChart = ref(false)
		const series = ref([])


		const displayChart = (post) => {
			series.value.length = 0;
			console.log(error.value)
			showChart.value = !showChart.value
			console.log(post)
			series.value.push(post)
			console.log(post.id)
			// series.value = series.value.filter(line => {
			// 	if(line.id != post.id) {
			// 		return line;
			// 	}
			// })
		}

		return {
			displayChart,
			retrievedPosts,
			showChart,
			series
		}
	}
}
</script>

<style>
	.posts h3 {
		padding: 10px;
	}

	table {
		border: 1px solid black;
		width: 800px;
		margin: 0 auto;
	}

	th {
		color: white;
		padding: 10px 10px;
	}

	td {
		padding: 4px 10px;
	}

	th {
		font-size: 20px;
		background: darkgray;
	}

	td:first-child, th:first-child {
		text-align: left;
	}

	tr:nth-child(odd) {
		background: #dfdfdf;
	}

	.chart-layer {
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

	.chart-container {
		width: 80%;
		height: 80%;
		background: white;display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.chart-container .chart-button {
		margin-top: 40px;
	}
</style>