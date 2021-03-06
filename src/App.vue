<template>
  <Header />
  <article class="container">
    <div class="content">
      <router-view />
    </div>
  </article>
  <Footer />
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  components: { Header, Footer },
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
  width: 100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  text-align: center;
  width: 100vw;
}

.content {
  display: block;
  background: white;
}

  @media screen and (max-width: 600px) {
		.content {
			width: 100vw;
		}
	}

</style>
