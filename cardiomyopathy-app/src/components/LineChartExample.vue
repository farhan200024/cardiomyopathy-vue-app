<template>
	<h1>Line Chart</h1>
  <input type="text" placeholder="Line Name" v-model="lineName">
	<input type="file" @change="parseFile" accept=".csv">
	<button @click="handleClick" >Generate Chart</button>
  <button @click="addSeries" >Add Series</button>
  
  <button @click="toggleIt" >Toggle</button>

	<apexchart v-if="showChart"
		type="line"
		height="350"
		width="500"
		:options="chartOptions"
		:series="series"
	></apexchart>
  
</template>

<script>
import useParseCsvToJson from '../composables/useParseCsvToJson'
import {  ref } from 'vue'

export default {
	setup() {
		const { parseFile, data } = useParseCsvToJson()
    const lineName = ref('Control')
    const line = ref(null)
    const multiSeries = ref([])
    const showChart = ref(false)

		const chartOptions = ref({
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      // the data that goes onto the X- axis
      xaxis: {
				type: 'numeric',
        min: 0,
        max: 3
      },
      // the text on the y axis
      yaxis: {
        title: {
          text: "Sarcomere Length",
        },
				min: 0,
				max: 2,
				tickAmount: 5
      },
      // the colours and text displayed on the top right of the chart
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    });
    
    // y values of the series
    // const series = computed(() => {
    //   console.log(line)
    //   return [multiSeries.value]
    // })
    const series = ref([])

		const handleClick = () => {

      line.value = {
        name: lineName.value,
        data: data.value
      }

      multiSeries.value.push(line.value)

      multiSeries.value.push({
        name: "Heart",
        data: [
          [0.2, 0.6],
          [0.4, 0.3],
          [0.6, 0.5],
          [0.7, 0.4],
          [0.8, 0.3],
          [1, 0.2],
          [1.2, 0.5],
          [0.8, 0.8]
        ]
      })

      series.value = multiSeries.value

      console.log(multiSeries.value.length)
      //showChart.value = true

      //console.log(line.value)

      // console.log(line.value.name)
		}

    const addSeries = () => {
      multiSeries.value.push({
        name: "AnotherLne",
        data: [
          [0.1, 0.6],
          [0.4, 0.5],
          [0.6, 0.8],
          [0.7, 0.4],
          [0.8, 0.1],
          [1, 0.2],
          [1.2, 0.3],
          [0.8, 0.4]
        ]
      })
      series.value = multiSeries.value
      console.log(series.value.length)
    }

    const toggleIt = () => {
      showChart.value = !showChart.value
      console.log(showChart.value)
    }

		return {
			parseFile,
			chartOptions,
			series,
			data,
			handleClick,
      line,
      lineName,
      addSeries,
      showChart,
      toggleIt
		}
	}
}
</script>

<style>

</style>