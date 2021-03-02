import { ref } from "vue"
import { projectAuth } from '../firebase/config'

const error = ref(null)

const signup = async (email, password, displayName) => {
	error.value = null

	try {
		const res  = await projectAuth.createUserWithEmailAndPassword(email, password)

		if(!res) {
			throw new Error('Could not complete the sign up')
		}
		// you cannot create the properties, you have to use already created
		await res.user.updateProfile({ displayName })
		error.value = null
		
		// send an email verification to the users email
		res.user.sendEmailVerification();
		console.log(res.user)

		return res

	} catch(err) {
		console.log(err.message)

		error.value = err.message
	}
}

const useSignup = () => {
	return { error, signup }
}

export default useSignup