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

export default {
  components: { Header }
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
  border: 1px solid blue;
}

.content {
  display: block;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid red;
  background: white;
}

</style>
