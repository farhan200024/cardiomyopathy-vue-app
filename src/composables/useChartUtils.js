import { ref } from "vue"

const error = ref(null)
const yMin = ref(null)
const yMax = ref(null)
const xMin = ref(null)
const xMax = ref(null)

const calcValues = (allSeries) => {
  error.value = null
  try {
    let yNumbers = []
    let xNumbers = []
    for(let i = 0; i < allSeries.length;  i++) {
      const data = allSeries[i].data;
      for(let j = 0; j < data.length; j++){
        yNumbers.push(Number(data[j][1]))
        xNumbers.push(Number(data[j][0]))
      }
    }
    yMax.value = Math.max(...yNumbers) 
    yMin.value = Math.min(...yNumbers)

    xMax.value = Math.max(...xNumbers) + (Math.max(...xNumbers) / 20)
    xMin.value = Math.min(...xNumbers) - (Math.min(...xNumbers) / 20)

    if(xMin.value < 1) {
      xMin.value = 0
    }
    // console.log(yMax.value)
    // console.log(yMin.value)
    console.log(allSeries)
  } catch(err) {
    console.log(err.message)
    error.value = 'There was an issue displaying the chart, please check the data or refresh the page'
  }
}

const useChartUtils = () => {
	return { error, xMin, xMax, yMin, yMax, calcValues }
}

export default useChartUtils
