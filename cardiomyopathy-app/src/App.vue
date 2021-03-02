<template>
  <Header />
  <article class="container">
    <div class="content">
      <router-view />
    </div>
  </article>
</template>

<script>
import Header from './components/Header'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  components: { Header },
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('authAction')
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  text-align: center;
}

.content {
  display: block;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
}

</style>
