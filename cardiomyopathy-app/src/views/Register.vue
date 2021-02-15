<template>
  <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="Register">

        <input type="text" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <input type="submit" value="Register">
        <p>Already have an account? <router-link to="/login">Login Here</router-link></p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import {ref} from 'vue';

export default {
    setup() {
        const email = ref("");
        const password = ref("");
      ///  const Register = () => {
        ///    firebase
           //     .auth()
            //    .createUserWithEmailAndPassword(email.value, password.value)
             //   .then(user => {
              //     user.sendEmailVerification();




                 ///alert(user);
            //    })
            //    .catch(err => alert(err.message));
      //  }

    const  Register = () =>  {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(() => {
         alert(user); ///if user tries to use same email already in the database
      // now we have access to the signed in user
      const user = firebase.auth().currentUser;
      
      // send the signed in user a verification email
      user.sendEmailVerification();
     /// alert(user.message);
     
      alert('Registered ! please confirm your email');
     
    })
   
    .catch(err => alert(err.message));
    
};
        return {
            Register,
            email,
            password
        }
    }
}
</script>