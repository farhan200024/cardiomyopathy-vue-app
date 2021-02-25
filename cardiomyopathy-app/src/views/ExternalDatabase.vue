<template>
  <form class="options">
    <label>Select Option: </label>
    <select v-model="option" required>
      <option value="" selected>Choose</option>
      <option value="term">Cardiomyopathy Type</option>
      <option value="gene">Gene</option>
    </select>
      <div v-if="option === 'gene'">
      <label>Select Gene: </label>
      <select v-model="keyword" required>
        <option value="" selected>Choose</option>
        <option value="TNNT2">TNNT2</option>
        <option value="MYBPC3">MYBPC3</option>
        <option value="MYH7">MYH7</option>
        <option value="TPM1">TPM1</option>
      </select>
      </div>
      <div v-if="option === 'term'">
      <label>Select Type: </label>
      <select v-model="keyword" required>
        <option value="" selected>Choose</option>
        <option value="Hypertrophic_Cardiomyopathy">Hypertrophic Cardiomyopathy</option>
        <option value="Dilated_Cardiomypathy">Dilated Cardiomyopathy</option>
      </select>
      </div>
    <button class="primary" @click.prevent="searchData">Search</button>
  </form>
  <!-- An accordion needs to be created to make it easier to find the information -->
  <div class="geneInfo">
    <!-- {{ geneSynopsis.gene.entrezGeneSymbol }},  -->
    <h2 v-if="geneInfoOMIM">{{ geneInfoOMIM.replace(';', ',') }}</h2>
    <div v-if="geneDescNCBI">
      <h3>Description</h3>
      <p v-if="option !== 'term'">{{ geneDescNCBI[mutationId].summary }}</p>
      <p v-else>{{ geneDescNCBI }}</p>
    </div>
    <div v-if="phenotypes.length !== 0">
      <h3>Phenotypes</h3>
      <div v-for="phenotype in phenotypes" :key="phenotype.mimNumber">
        <h4>{{ phenotype.title }}</h4>
        <p>{{ phenotype.content }}</p>
      </div>
    </div>
    <div v-if="geneSynopsisHPO">
      <h3>Clinical Synopsis</h3>
      <div v-for="symptom in geneSynopsisHPO.termAssoc" :key="symptom.ontologyId">
        <h4>{{ symptom.name.toUpperCase() }}</h4>
        <p>{{ symptom.definition }}</p>
      </div>
    </div>
  </div>
  <!--<input type="text" required placeholder="Search" v-model="keyword">-->
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const keyword = ref("")
    const geneInfoOMIM = ref(null)
    const geneSynopsisHPO = ref(null)
    const geneDescNCBI = ref(null)
    const phenotypes = ref([])
    const phenotypeIds = ref([])
    const mutationId = ref(null)
    const option = ref('')
    const mutationsData = {
      TNNT2: 7139,
      MYBPC3: 4607,
      MYH7: 4625,
      TPM1: 7168,
      Hypertrophic_Cardiomyopathy: 'HP:0001639',
      Dilated_Cardiomypathy: 'HP:0001644'
    }

    const searchData = () => {

      // console.log(keyword.value)

      phenotypeIds.value = []
      geneInfoOMIM.value = null
      geneSynopsisHPO.value = null
      geneDescNCBI.value = null
      phenotypes.value = []

      // console.log(mutationsData[keyword.value])
      mutationId.value = mutationsData[keyword.value]

      axios
        .get("https://api.omim.org/api/entry/search?search=" + keyword.value.replace('_', ' ') + "&include=text&format=json&start=0&limit=10&apiKey=lqAHOJe4Qh-rRqd50orkUg")
        .then((response) => {
          if(option.value !== 'term') {
            geneInfoOMIM.value = response.data.omim.searchResponse.entryList[0].entry.titles.preferredTitle
          } else {
            console.log(response.data)
          }
          let phenotypeLoop = response.data.omim.searchResponse.entryList
          // console.log(response.data)
          for(let index in phenotypeLoop) {
            // console.log(phenotypeLoop[index])
            let currentPhenotype = phenotypeLoop[index].entry
            // console.log(currentPhenotype.titles)
            // console.log(keyword.value.replace('_', ' ').toUpperCase())
            if(currentPhenotype.titles.preferredTitle.includes(keyword.value.split('_')[0].toUpperCase())) {
              // console.log('I ran')
              phenotypes.value.push( { mimNumber: currentPhenotype.mimNumber , title: currentPhenotype.titles.preferredTitle, content: currentPhenotype.textSectionList[0].textSection.textSectionContent } )
            }
          }
          // console.log(phenotypes.value)
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("https://hpo.jax.org/api/hpo/" + option.value + "/" + mutationsData[keyword.value])
        .then((response) => {
          if(option.value === 'gene') {
            geneSynopsisHPO.value = response.data;
            // console.log(response.data.diseaseAssoc)
            let diseases = response.data.diseaseAssoc
            for(let index in diseases) {
              // console.log(diseases[index])
              if(diseases[index].diseaseName.includes('Hypertrophic')) {
                // console.log(diseases[index])
                phenotypeIds.value.push(diseases[index].diseaseId)
                // console.log(phenotypeIds.value)
              }
            }
          } else {
            console.log(response.data)
            // console.log(response.data.details.definition)
            geneDescNCBI.value = response.data.details.definition
            geneInfoOMIM.value = response.data.details.name
            // console.log(geneDescNCBI.value)
          }
          // console.log("HPO.JAX.ORG")
          // console.log(response.data)
          
          // console.log(geneSynopsis.value.termAssoc);
        })
        .catch((error) => {
          console.log(error);
        });

      if(option.value !== 'term') {
        axios
        .get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&retmode=json&id=" + mutationId.value ,{
          headers: {
            'Accept': 'application/json'
          }
        })
        .then((response) => {
          // console.log('NCBI')
          // console.log(response.data)
          geneDescNCBI.value = response.data.result
          // console.log(ncbiInfo.value[mutationId.value].summary)
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }

    return { 
      keyword,
      geneInfoOMIM,
      geneSynopsisHPO,
      geneDescNCBI,
      mutationId,
      searchData,
      phenotypeIds,
      phenotypes,
      option
    };
  },
};
</script>

<style>
  .geneInfo {
    text-align: left;
  }

  .geneInfo h2 {
    text-align: center;
    font-size: 32px;
    margin: 25px;
  }

  .geneInfo h3 {
    font-size: 24px;
    border-bottom: 1px solid #dfdfdf;
    display: inline-block;
    margin: 10px 20px;
  }

  .geneInfo h4 {
    display: inline-block;
    margin: 10px 40px;
  }

  .geneInfo p {
    font-size: 18px;
    margin: 5px 50px;
  }

  .options {
    width: 600px;
    margin: 0 auto;
    text-align: center;
    border-bottom: 1px solid #dfdfdf;
  }

  .options select {
    font-size: 18px;
    display: block;
    width: 600px;
    padding: 20px;
    outline: none;
    border: 2px solid #dfdfdf;
    border-radius: 20px;
  }

  .options select:focus {
    border: 2px solid black;
  }

  .options label {
    display: block;
    text-align: left;
    margin: 20px 0 0 10px;
    font-size: 22px;
    color: black;
    font-weight: bold;
  }

  .options button {
    margin: 25px;
  }

</style>
