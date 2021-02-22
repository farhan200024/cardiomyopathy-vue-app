import firebase from 'firebase/app';
import { projectAuth } from '@/firebase/config'
import { ref } from 'vue';
import router from '../../router';

const error = ref(null)

const actions = {
	async signUpAction({ commit }, payload) {
		error.value = null

		try {
			const response = await projectAuth.createUserWithEmailAndPassword(payload.email, payload.password)

			if(!response) {
				throw new Error("Could not complete the signup")
			}
			commit("setUser", response.user)

			// send an email verification to the users email
			await response.user.sendEmailVerification();
			
			await response.user.updateProfile({
				displayName: payload.displayName
			})

			error.value = null
			router.push({ path: '/' })
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
				console.log(response.user)
				commit("setUser", response.user)
				router.push({ path: '/' })
			})
			.catch(error => {
				commit("setError", error.message)
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