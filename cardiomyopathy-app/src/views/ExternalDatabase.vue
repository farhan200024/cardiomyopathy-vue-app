<template>
  
    <select v-model = "keyword">

        <option selected = "selected" disabled>Options</option>

        <optgroup label = "Hypertrophic Cardiomyopathy">

            <option value = "7139">TNNT</option>
            <option value = "4607">MYBPC3</option>
            <option value = "4625">MYH7</option>
            <option value = "7168">TPM</option>

        </optgroup>

    </select>
    <button @click="searchData">Search</button>   
    <div v-for="(index, gene) in geneSynopsis" :key="gene">
        
        <h2>{{ gene }}</h2>
        
    </div>
    <!--<input type="text" required placeholder="Search" v-model="keyword">-->

</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

    export default 
    {

        setup()
        {

            const keyword = ref('')
            const geneInfo = ref(null)
            const geneSynopsis = ref(null)

            const searchData = () => {
                console.log(keyword.value)
                axios
                    .get("https://hpo.jax.org/api/hpo/gene/" + keyword.value)
                    .then(response => {
                        console.log('data:', response.data)
                        geneSynopsis.value = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } 

            return { keyword, geneInfo, geneSynopsis, searchData }

        }

    }

</script>

<style>

</style>