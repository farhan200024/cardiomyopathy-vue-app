<template>
	<div>
		<h1>Posts</h1>
		<div v-if="allPosts">
			<table>
				<tr>
					<th>#</th>
					<th>Line</th>
					<th>Phenotype</th>
					<th>Gene</th>
					<th>Actions</th>
				</tr>
				<tr v-for="(post, index) in allPosts" :key="post.id" >
					<td>{{ index + 1 }}</td>
					<td>
						<p>{{ post.title }}</p>
					</td>
					<td>{{ post.cardiomyopathyType }}</td>
					<td>{{ post.mutationName }}</td>
					<td class="chart-button-wrapper">
						<span @click="displayChart(post)" class="material-icons" id="chart-button">stacked_bar_chart</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<Layer v-if="showChart && series.length !== 0" @close="showChart = !showChart" >
		<template v-slot:content>
			<LineChart :series="series"/>
		</template>
	</Layer>
	
</template>

<script>
import { ref } from 'vue'
import useDAO from '../composables/useDAO'
import LineChart from '../components/LineChart'
import Layer from '../components/Layer'

export default {
	components: { LineChart, Layer },
	setup() {
		const { error, retrieveAllPosts, allPosts } = useDAO()
		retrieveAllPosts()

		const showChart = ref(false)
		const series = ref([])


		const displayChart = (post) => {
			series.value.length = 0;
			// console.log(error.value)
			showChart.value = !showChart.value
			// console.log(post)
			series.value.push(post)
			// console.log(post.id)
			// series.value = series.value.filter(line => {
			// 	if(line.id != post.id) {
			// 		return line;
			// 	}
			// })
		}

		return {
			displayChart,
			allPosts,
			showChart,
			series,
			error
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
		margin: 30px auto;
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

	.chart-button-wrapper {
		text-align: center;
	}

	#chart-button {
		margin: 14px;
		font-size: 28px;
	}

	#chart-button:hover {
		cursor: pointer;
		color: green;
	}

</style>