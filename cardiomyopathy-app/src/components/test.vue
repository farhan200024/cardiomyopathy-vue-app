<template>
	<apexchart 
		type="line"
		height="350"
		width="500"
		:options="chartOptions"
		:series="series"
	></apexchart>
  <button @click="lineDebug">Debug Chart</button>
</template>

<script>
import { ref } from 'vue'

export default {
	props: ['series'],
	setup(props) {

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
        text: "MYBPC",
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
        labels: {
          formatter: function (value) {
            if(value % 1 != 0) {
              return parseFloat(value).toFixed(2);
            }
            return value
          }
        },
				type: 'numeric'
      },
      // the text on the y axis
      yaxis: {
        title: {
          text: "Sarcomere Length",
        },
        labels: {
          formatter: function(value) {
            return parseFloat(value).toFixed(2);
          }
        },
        type: 'numeric'
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
      console.log(props.series)
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