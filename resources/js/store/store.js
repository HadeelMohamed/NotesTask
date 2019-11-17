import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        status: '',
    token: localStorage.getItem('token') || '',
    user : {}
    },

    mutations: {
  auth_request(state){
    state.status = 'loading'
  },
  auth_success(state, token, user){
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error(state){
    state.status = 'error'
  },
  logout(state){
    state.status = ''
    state.token = ''
  },
},

     actions: {
     	LoginUser({commit}, payload){
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post('/vue/login', {
                username: payload.username,
                password: payload.password,
            })
      .then(resp => {

        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        reject(err)
        confirm('Please Check Email Or Passowrd');
      })
    })
},
     	    RegisterUser({commit}, payload) {
          return new Promise((resolve, reject) => {
    commit('auth_request')
     axios.post('/vue/register', {
                email: payload.email,
                password: payload.password,
                firstName:payload.firstName,
                username:payload.username,
            })
    .then(resp => {
      const token = resp.data.token
      const user = resp.data.user
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', token, user)
      resolve(resp)
    })
    .catch(err => {
      commit('auth_error', err)
      localStorage.removeItem('token')
      reject(err)
    })
  })
     },
     	    logout({commit}, payload) {
          return new Promise((resolve, reject) => {
    commit('logout')
     axios.get('/vue/logout')
    .then(resp => {
      
            localStorage.removeItem('token')

    });
    
  })
     },


 },

 getters : {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
}

});
