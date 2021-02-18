<template>
	<h1>Line Chart</h1>
  <input type="text" placeholder="Line Name" v-model="lineName">
	<input type="file" @change="onFileUpload" accept=".csv">
	<button @click="handleClick" >Generate Chart</button>

	<apexchart v-if="line"
		type="line"
		height="350"
		width="500"
		:options="chartOptions"
		:series="series"
	></apexchart>
</template>

<script>
import useParseCsvToJson from '../composables/useParseCsvToJson'
import { computed, ref } from 'vue'

export default {
	setup() {
		const { onFileUpload, data } = useParseCsvToJson()
    const lineName = ref('')
    const line = ref(null)

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
        min: 0.0,
        max: 2.0,
        range: 2,
        tickAmount: 5
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
    const series = computed(() => {
      console.log(line.value)
      return [line.value]
    })

		const handleClick = () => {
			data.value = data.value.map((item) => {
				let object = item.map((string) => {
					return Number(string)
				})
        //console.log("Object: ", object)
				return object
			})

      console.log(line.value)

      line.value = {
        name: lineName.value,
        data: data.value
      }

      //console.log(line.value)

      // console.log(line.value.name)
		}

		return {
			onFileUpload,
			chartOptions,
			series,
			data,
			handleClick,
      line,
      lineName
		}
	}
}
</script>

<style>

</style>