<template>
  <button @click="lineDebug" >Debug the chart</button>
	<apexchart 
		type="line"
		height="350"
		width="500"
		:options="chartOptions"
		:series="series"
	></apexchart>
</template>

<script>
import { ref } from 'vue'
import useChartUtils from '../composables/useChartUtils'

export default {
	props: ['series'],
	setup(props) {
    const { xMin, xMax, yMin, yMax, calcValues } = useChartUtils()

    calcValues(props.series)
    // xMin.value = (props.series[0].data[0][0] < 1 ? 0 : props.series[0].data[0][0])
    
    // yMin.value = (props.series[0].data[0][1] < 1 ? 0 : props.series[0].data[0][1])
    


    xMax.value = parseFloat(props.series[0].data[props.series[0].data.length - 1][0])
    // yMax.value = parseFloat(props.series[0].data[props.series[0].data.length - 1][1])

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
        min: xMin.value,
        max: xMax.value,
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
				min: yMin.value,
				max: yMax.value,
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