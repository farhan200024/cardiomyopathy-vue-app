import { ref } from "vue"
import { projectAuth } from '../firebase/config'

const resetPasswordError = ref(null)

const resetPassword = async (email) => {
	resetPasswordError.value = null

	try {
		console.log(email)
		const res = await projectAuth.sendPasswordResetEmail(email)
		resetPasswordError.value = null
		return res
	} catch(err) {
		console.log(err.message)
		resetPasswordError.value = 'Email cannot be found'
	}
}

const useResetPassword = () => {
	return { resetPasswordError, resetPassword }
}

export default useResetPassword