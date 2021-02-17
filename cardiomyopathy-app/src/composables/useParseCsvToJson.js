import { ref } from "vue"
import papa from 'papaparse'

const x = ref([])
const y = ref([])
let file = null

const onFileUpload = (e) => {
	let files = e.target.files || e.dataTransfer.files
	//console.log(files)
	if(!files.length) {
		return
	}
	file = files[0]
	papa.parse(file, {
		complete: (results) => {
			//console.log("finished: ", results.data)
			for(let i = 1; i < results.data.length; i++) {
				//console.log(results.data[i])
				if(results.data[i][0] !== '' && results.data[i][0] !== undefined) {
					x.value.push(results.data[i][0])
				}
				if(results.data[i][1] !== '' && results.data[i][1] !== undefined) {
					y.value.push(results.data[i][1])
				}
			}
			console.log(x.value)
			console.log(y.value)
		}
	})
}

const useParseCsvToJson = () => {
	return { onFileUpload,  }
}

export default useParseCsvToJson
