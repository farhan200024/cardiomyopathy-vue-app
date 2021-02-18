import { ref } from "vue"
import papa from 'papaparse'

const data = ref([])
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
				if(results.data[i][0] !== '' && results.data[i][0] !== undefined && results.data[i][0] !== '' && results.data[i][0] !== undefined) {
					data.value.push(results.data[i])
				}
			}
			// console.log(data.value)
		}
	})
}

const useParseCsvToJson = () => {
	return { onFileUpload, data }
}

export default useParseCsvToJson
