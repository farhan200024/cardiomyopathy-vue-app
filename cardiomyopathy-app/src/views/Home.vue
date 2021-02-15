<template>
  <div class="home">
    <h1>Hello, {{name}}! Welcome to our Cardiomyophaty website!</h1>
    <router-link to="/about">About</router-link>
    <br>
    <button class="logout" @click="Logout">Logout</button>
  </div>
</template>

<script>
import {ref, onBeforeMount} from 'vue';
import firebase from 'firebase';

export default {
  setup(){
    // If there's someone logged in get username
    const user = firebase.auth().currentUser;

    const name = ref("");

    onBeforeMount(() => {
      if (user) {
        name.value = user.email.split('@')[0];
      }
    });

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed Out"))
        .catch(err => alert(err.message));
    }

    return {
      name,
      Logout
    }
  }
}
</script>
