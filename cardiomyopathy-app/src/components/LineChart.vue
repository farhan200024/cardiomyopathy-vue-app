<template>
	<apexchart 
		type="line"
		height="350"
		width="500"
		:options="chartOptions"
		:series="series"
	></apexchart>
  <button @click="lineDebug" >Debug the chart</button>
</template>

<script>
import { ref } from 'vue'

export default {
	props: ['series'],
	setup(props) {
    const xMax = ref(null)
    const yMax = ref(null)


    xMax.value = parseFloat(props.series[0].data[props.series[0].data.length - 1][0])
    yMax.value = parseFloat(props.series[0].data[props.series[0].data.length - 1][1])

		const chartOptions = ref({
			chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
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
        max: xMax.value + (xMax.value / 10),
        tickAmount: 5,
        labels: {
          formatter: function(value) {
            return parseFloat(value).toFixed(2);
          }
        },
      },
      // the text on the y axis
      yaxis: {
        title: {
          text: "Sarcomere Length",
        },
				min: 0,
				max: yMax.value + ((yMax.value / 10) * 2),
        tickAmount: 5,
        labels: {
          formatter: function(value) {
            return parseFloat(value).toFixed(2);
          }
        },
      },
      // the colours and text displayed on the top right of the chart
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
		})

		const lineDebug = () => {
      console.log(xMax.value)
      console.log(xMax.value + (xMax.value / 10))
      console.log(yMax.value)
      console.log(yMax.value + (yMax.value / 10))
		}

		return {
			chartOptions,
			lineDebug
		}
	}
}
</script>

<style>

</style>