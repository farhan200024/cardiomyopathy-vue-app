import firebase from 'firebase/app';
import { projectAuth, projectFirestore } from '@/firebase/config'
import { ref } from 'vue';
import router from '../../router';

const error = ref(null)

const actions = {
	async signUpAction({ commit }, payload) {
		error.value = null

		try {
			// create and account for the user
			const response = await projectAuth.createUserWithEmailAndPassword(payload.user.email, payload.user.password)

			if(!response) {
				throw new Error("Could not complete the signup")
			}
			// commit the state change by invoking vuex mutation
			commit("setUser", response.user)

			// send an email verification to the users email
			await response.user.sendEmailVerification()
			
			await response.user.updateProfile({
				displayName: payload.user.displayName
			})

			// delete the unnecessary properties from the user object.
			// delete payload.user.email
			delete payload.user.password
			// delete payload.user.displayName
			
			// create a specific document for the user to 
			// create collections for lines
			// need to ask if it is okay to do it by team members
			await projectFirestore
							.collection('users')
							.doc(response.user.uid)
							.set(payload.user)

			error.value = null
			router.push({ name: 'VerifyEmail' })
		return response

		} catch(err) {
			console.log(err.message)
			error.value = err.message
		}
	},

	signInAction({ commit }, payload) {
		return firebase
			.auth()
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				// console.log(response.user)
				commit("setUser", response.user)
				router.push({ path: '/' })
			})
			.catch(error => {
				console.log(error.message)
				commit("setError", "Your username or password is incorrect!")
			});
	},

	signOutAction({commit}) {
		firebase
			.auth()
			.signOut()
			.then(() => {
				commit("setUser", null);
				router.push({ path: '/Login' })
			})
			.catch(error => {
				commit("setError", error.message);
			});
	},

	authAction({commit}) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				commit("setUser", user);
			} else {
				commit("setUser", null);
			}
		});
	}
}

export default actions