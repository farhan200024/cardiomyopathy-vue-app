<template>
	<div v-if="error">
		<p class="error">{{error}}</p>
	</div>
  <div v-else class="geneInfo">
		<div v-if="description">
			<div>
				<h2 v-if="title">{{ title.replace(";", ",") }}</h2>
				<div v-if="description">
					<Accordion>
						<template v-slot:button>
							<h3>Description</h3>
						</template>
						<template v-slot:content>
							<p>{{ description }}</p>
						</template>
					</Accordion>
				</div>
				<div v-if="Object.entries(clinicalSynopsis).length !== 0">
					<Accordion>
						<template v-slot:button>
							<h3>Clinical Synopsis</h3>
						</template>
						<template v-slot:content>
							<div v-for="(property, key) in clinicalSynopsis" :key="key">
								<h4>
									{{ key.charAt(0).toUpperCase()
									}}{{ key.substr(1, key.length).replace("-", " ") }}
								</h4>
								<p>{{ property }}</p>
							</div>
						</template>
					</Accordion>
				</div>
			</div>
		</div>
		<div v-else>
			<div>
				<HeartPulse />
			</div>
		</div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import HeartPulse from '../components/HeartPulse'
import Accordion from '../components/Accordion'

export default {
	components: { HeartPulse, Accordion },
	props: ['keyword'],
	setup(props) {
		const hpoBaseURL = 'https://hpo.jax.org/api/hpo/';
		const termSearchEndPoint = 'search/?q='
		const title = ref('')
		const description = ref('')
		const clinicalSynopsis = ref({})
		const error = ref('')

		const keyword = computed(() => {
			return props.keyword
		})

		watch(keyword, () => {
			retrieveData()
		})

		const retrieveData = async () => {
			title.value = ''
			description.value = ''
			clinicalSynopsis.value = {}
			error.value = null
			// await new Promise(resolve => {
			// 	setTimeout(resolve, 1500)
			// })
			console.log(props.keyword)
			try {
				// retrieve the id of the input search keyword
				let response = await axios.get(hpoBaseURL + termSearchEndPoint + props.keyword)
				console.log("Term Search: ", response.data)
				let termId = null

				let diseases = response.data.diseases
				for(let i in diseases) {
					if(diseases[i].dbName.toUpperCase().includes(props.keyword.toUpperCase().split(' ')[0])) {
						// console.log(diseases[i])
						termId = diseases[i].diseaseId
						break
					}
				}
				console.log('termID: ', termId)
				response = await axios.get('https://api.omim.org/api/entry?include=text&apiKey=lqAHOJe4Qh-rRqd50orkUg&format=json&mimNumber=' + termId.split(':')[1])
				// console.log(response.data)
				let omimData = response.data.omim.entryList[0].entry
				// console.log(omimData)
				title.value = omimData.titles.preferredTitle
				for(let i in omimData.textSectionList) {
					if(omimData.textSectionList[i].textSection.textSectionName === 'description') {
						// console.log(omimData.textSectionList[i].textSection)
						description.value = omimData.textSectionList[i].textSection.textSectionContent
						break
					}
				}
				response = await axios.get('https://api.omim.org/api/clinicalSynopsis?include=clinicalSynopsis&apiKey=lqAHOJe4Qh-rRqd50orkUg&format=json&mimNumber=' + termId.split(':')[1])
				let synopsisData = response.data.omim.clinicalSynopsisList[0].clinicalSynopsis
				if('oldFormat' in synopsisData) {
					synopsisData = synopsisData.oldFormat
				}
				for(let i in synopsisData) {
					if(i !== 'mimNumber' && i !== 'prefix' && i !== 'preferredTitle') {
						clinicalSynopsis.value[i.replace(/([a-z0-9])([A-Z])/g, '$1-$2')] = synopsisData[i]
					}
				}

			} catch(err) {
				error.value = "Sorry, there was an error retrieving the data"
				console.log(err.message)
			}
		}

		retrieveData()

		return {
			title,
			description,
			clinicalSynopsis,
			error
		}
	}
}
</script>

<style></style>
