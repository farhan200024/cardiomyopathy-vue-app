import { projectFirestore } from '@/firebase/config'
import { ref } from 'vue'

const error = ref(null)
const retrievedPosts = ref([])

const deletePost = async (userUID, postUID) => {
	error.value = null
	try {
		console.log()

		await projectFirestore
					.collection('users')
					.doc(userUID)
					.collection('series')
					.doc(postUID)
					.delete()

	} catch(err) {
		console.log(err.message)
		error.value = "There was problem deleting this line"
	}
}

const retrievePosts = async (userUID) => {
	error.value = null
	retrievedPosts.value.length = 0

	try {
		await projectFirestore
						.collection('users')
						.doc(userUID)
						.collection('series')
						.onSnapshot((snap) => {
							retrievedPosts.value = snap.docs.map(doc => {
								return { ...doc.data(), id: doc.id }
							})
							if(retrievedPosts.value){
								retrievedPosts.value.map(post => {
									post.data = JSON.parse(post.data)
								})
							}
						})
		
		// response.docs.map(doc => {
		// 	retrievedPosts.value.push({...doc.data(), id: doc.id })
		// })

	} catch(err){
		console.log(err.message)
		error.value = "There was an error retrieving the data"
	}
}

const retrieveAllPosts = async () => {
	error.value = null
	retrievedPosts.value.length = 0

	try {
		console.log('Lets Start')
		await projectFirestore
					.collectionGroup('series')
					.onSnapshot((snap) => {
						retrievedPosts.value = snap.docs.map(doc => {
							return { ...doc.data(), id: doc.id }
						})
						if(retrievedPosts.value){
							retrievedPosts.value.map(post => {
								post.data = JSON.parse(post.data)
							})
						}
					})

					console.log(retrievedPosts)
	} catch(err) {
		console.log(err.message)
	}
}

const addPost = async (userUID, post) => {
	error.value = null

	try {
		await projectFirestore
					.collection('users')
					.doc(userUID)
					.collection('series')
					.add(post)
					
	} catch(err) {
		console.log(err.message)
		error.value = "The data could not be saved"
	}
}

const updatePost = async (userUID, post, postID) => {
	console.log('USER ID: ', userUID)
	console.log('POST: ', post)
	console.log('POST ID: ', postID)

	try {
		await projectFirestore
					.collection('users')
					.doc(userUID)
					.collection('series')
					.doc(postID)
					.update(post)

	} catch(err) {
		console.log(err.message)
		error.value = "There was an issue while updating the data"
	}
}

const useDAO = () => {
	return { addPost, updatePost, retrievePosts, retrieveAllPosts, retrievedPosts, deletePost, error }
}

export default useDAO