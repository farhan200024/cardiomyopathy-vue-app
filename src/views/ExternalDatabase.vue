<template>
  <h1>Search for Data</h1>
	<div class="data-container">
		<form class="options">
      <label>Select Option: </label>
      <select v-model="queryOption" required>
        <option value="" selected>Choose</option>
        <option value="term">Cardiomyopathy Type</option>
        <option value="gene">Gene</option>
      </select>
        <div class="second-options" v-if="queryOption === 'term'">
          <label>Select Term: </label>
          <select v-model="queryKeyword" required>
            <option value="" selected>Choose</option>
            <option value="Cardiomyopathy, Familial Hypertrophic">Hypertrophic Cardiomyopathy</option>
            <option value="Cardiomyopathy, Dilated, 1a">Dilated Cardiomyopathy</option>
          </select>
        </div>
        <div class="second-options" v-if="queryOption === 'gene'">
          <label>Select Gene: </label>
          <select v-model="queryKeyword" required>
            <option value="" selected>Choose</option>
            <option value="TNNT2">TNNT2</option>
            <option value="MYBPC3">MYBPC3</option>
            <option value="MYH7">MYH7</option>
            <option value="TPM1">TPM1</option>
          </select>
        </div>
      <button class="primary" @click.prevent="searchData">Search</button>
		</form>
    <div class="information-wrapper">
      <div v-if="option">
        <CardiomyopathyType v-if="option === 'term'" :keyword="keyword" />
        <GeneType v-if="option === 'gene'" :keyword="keyword"/>
      </div>
      <h3 v-else >Search to retrieve the data!</h3>
    </div>
	</div>
</template>

<script>
import { ref } from 'vue';
import CardiomyopathyType from '../components/CardiomyopathyType'
import GeneType from '../components/GeneType'

export default {
	components: { CardiomyopathyType, GeneType },
	setup() {
		const queryOption = ref('')
		const option = ref('')
		const queryKeyword = ref('')
		const keyword = ref('')

		const searchData = async () => {
			option.value = queryOption.value
			keyword.value = queryKeyword.value
		}

		return {
			searchData,
			queryKeyword,
			keyword,
			queryOption,
			option,
		}
	}
}
</script>

<style>

  .data-container {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

	.geneInfo {
    width: 100vw;
    margin: 0 auto;
  }

  .geneInfo h2 {
    text-align: center;
    display: block;
    font-size: 32px;
    margin: 25px;
  }

  .geneInfo h3 {
    font-size: 24px;
    display: inline;
  }

  .geneInfo h4 {
    display: block;
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

  @media screen and (max-width: 600px) {
		.options {
      width: 100vw;
      margin: 0 auto;
    }

    .options select, .options label, .options .second-options {
      width: 90vw;
      margin: 0 auto;
      padding: 3.0vw;
    }

    .information-wrapper {
			width: 100vw;
      margin: 0 auto;
    }

    .geneInfo {
      width: 100vw;
      margin: 0;
      text-align: center;
    }

    .geneInfo h2 {
      display: block;
      width: 100vw;
      margin: 0;
      padding: 20px 0;
      font-size: 5.9vw;
    }
    
    .geneInfo h3 {
      font-size: 4.0vw;
      display: inline;
    }

    .geneInfo h4 {
      text-align: left;
      display: block;
      margin: 10px 10px;
    }

    .geneInfo p {
      width: 90vw;
      font-size: 4vw;
      margin: 15px;
    }
	}
</style>
