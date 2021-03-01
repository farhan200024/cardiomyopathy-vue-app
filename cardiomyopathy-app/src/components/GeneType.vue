<template>
	<div v-if="error">
		<p class="error">{{error}}</p>
	</div>
  <div v-else class="geneInfo">
		<div v-if="title">
			<div>
				<h2>{{ title }}</h2>
				<div>
					<Accordion>
						<template v-slot:button>
							<h3 >Description</h3>
						</template>
						<template v-slot:content>
							<p>{{ description }}</p>
						</template>
					</Accordion>
				</div>
			</div>
			<div>
				<Accordion>
					<template v-slot:button>
						<h3>Phenotype</h3>
					</template>
					<template v-slot:content>
						<h4>{{ phenotypeTitle.replace(';', ',') }}</h4>
						<div v-for="item in phenotype" :key="item.textSection.textSectionName">
							<h4>{{ item.textSection.textSectionTitle }}</h4>
							<p>{{ item.textSection.textSectionContent }}</p>
						</div>
					</template>
				</Accordion>
			</div>
			<Accordion>
					<template v-slot:button>
						<h3>Clinical Synopsis</h3>
					</template>
					<template v-slot:content>
						<div v-for="item in clinicalSynopsis" :key="item.ontologyId" >
							<h4>{{ item.name }}</h4>
							<p>{{ item.definition }}</p>
						</div>
					</template>
				</Accordion>
		</div>
		<div v-else>
				<HeartPulse />
		</div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import HeartPulse from '../components/HeartPulse'
import Accordion from '../components/Accordion'
import axios from 'axios'

export default {
	components: { HeartPulse, Accordion },
	props: ['keyword', 'option'],
	setup(props) {
		const title = ref('')
		const description = ref('')
		const phenotypeTitle = ref('')
		const phenotype = ref({})
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
			phenotypeTitle.value = ''
			phenotype.value = {}
			error.value = null
			const hpoBaseURL = 'https://hpo.jax.org/api/hpo/';
			// await new Promise(resolve => {
			// 	setTimeout(resolve, 1500)
			// })

			try {

				let response = await axios.get(hpoBaseURL + 'search/?q=' + keyword.value)
				// console.log("Term Search: ", response.data)
				let termId = null

				let genes = response.data.genes
				for(let i in genes) {
					// console.log(genes[i])
					if(genes[i].entrezGeneSymbol.toUpperCase().includes(keyword.value)) {
						termId = genes[i].entrezGeneId
						break
					}
				}
				// console.log(termId)

				response = await axios.get(hpoBaseURL + 'gene/' + termId)
				clinicalSynopsis.value = response.data.termAssoc
				let diseaseId = null
				for(let item in response.data.diseaseAssoc) {
					// console.log(response.data.diseaseAssoc[item])
					if(response.data.diseaseAssoc[item].diseaseName.includes('Cardiomyopathy, Familial Hypertrophic')) {
						diseaseId = response.data.diseaseAssoc[item].diseaseId.split(':')[1]
						// console.log(diseaseId)
						break
					}

				}

				response = await axios.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&retmode=json&id=" + termId)

				// console.log(response.data.result[termId])
				description.value = response.data.result[termId].summary

				response = await axios.get('https://api.omim.org/api/entry?include=text&apiKey=lqAHOJe4Qh-rRqd50orkUg&format=json&mimNumber=' + diseaseId)
				// console.log(response.data)

				let data = response.data.omim.entryList[0].entry
				// console.log(data)
				phenotypeTitle.value = data.titles.preferredTitle
				phenotype.value = data.textSectionList

				response = response = await axios.get('https://api.omim.org/api/entry/search?include=text&apiKey=lqAHOJe4Qh-rRqd50orkUg&format=json&start=0&limit=10&search=' + keyword.value)
				// console.log(response.data)

				// console.clear()

				data = response.data.omim.searchResponse.entryList

				for(let i in data) {
					// console.log(data[i].entry.titles.preferredTitle)
					if(data[i].entry.titles.preferredTitle.includes(keyword.value)) {
						title.value = data[i].entry.titles.preferredTitle.replace(';', ',')
						break
					}
				}

			} catch(err) {
				error.value = "Sorry, there was an error retrieving the data"
				console.log()
			}
		}

		retrieveData()

		return {
			title,
			description,
			phenotypeTitle,
			phenotype,
			clinicalSynopsis,
			error
		}
	}

}
</script>

<style>

</style>