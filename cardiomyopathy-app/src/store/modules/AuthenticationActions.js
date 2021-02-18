import firebase from 'firebase/app';

const actions = {
	signUpAction({ commit }, payload) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				console.log(response.user)
				response.user.updateProfile(payload.displayName)
			}).then(response => {
				console.log(response.user)
				response.user.sendEmailVerification()
			}).then(response => {
				console.log(response.user)
				commit("setUser", response.user)
			})
			.catch(error => {
				commit("setError", error.message)
			});
	},

	signInAction({ commit }, payload) {
		return firebase
			.auth()
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				console.log(response.user)
				commit("setUser", response.user)
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