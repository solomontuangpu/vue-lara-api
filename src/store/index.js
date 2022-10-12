import { createStore } from 'vuex'

export default createStore({
  state: {
    apiUrl : "http://127.0.0.1:8000/api/v1/",
    token : null,
    auth: null
  },
  getters: {
    getUrl: (state) => (uri) => state.apiUrl+uri
  },
  mutations: {
  },
  actions: {
    setToken({state}, token){
      return state.token = token;
    },
    setAuth({state}, auth){
      return state.auth = auth;
    },
    logout({state}){
      state.token = null
      state.auth = null
    }
  },
  modules: {
  }
})
