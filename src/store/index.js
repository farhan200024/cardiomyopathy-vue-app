import { createStore } from 'vuex'
import mutations from './modules/AuthenticationMutations'
import actions from './modules/AuthenticationActions'
import getters from './modules/AuthenticationGetters'

const initialUserState = () => {
  return { user: null, error: null }
}

export default createStore({
  state: initialUserState(),
  mutations: mutations,
  actions: actions,
  getters: getters
})
