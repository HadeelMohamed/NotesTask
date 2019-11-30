import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);


axios.interceptors.request.use(function (config) {
    // assume your access token is stored in local storage 
    // (it should really be somewhere more secure but I digress for simplicity)
    let token = localStorage.getItem('token')
    if (token) {
       config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export default new Vuex.Store({
    state: {
        status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    app_snackbar_msgs: null,
    app_snackbar_color: null,
    app_snackbar_icon: null,
    all_notes:{},
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
  set_app_msgs(state, payload){
            state.app_snackbar_msgs= payload.msg;
            state.app_snackbar_color= payload.color;
            state.app_snackbar_icon= payload.icon;
        },
  set_clear_app_msgs(state){
             state.app_snackbar_msgs= null;
            state.app_snackbar_color= null;
            state.app_snackbar_icon= null;
        },
  set_notes(state, data){
            state.all_notes = data;
        },
},

     actions: {
     	LoginUser({commit}, payload){

    
      commit('auth_request')
        commit('set_clear_app_msgs');

      axios.post('/api/vue/login', {
                username: payload.username,
                password: payload.password,
            })
      .then(resp => {

        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, user)
        
      })
      .catch(err => {
        console.log(err);
        commit('auth_error')
        localStorage.removeItem('token')
        //reject(err)
         commit('set_app_msgs', {
                            msg:"Please Check Email Or Passowrd!",
                            color: "error",
                            icon: "error"
                        });
        
      })
   
},
     	    RegisterUser({commit}, payload) {
          
    commit('auth_request')
     axios.post('/api/vue/register', {
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
      
    })
    .catch(err => {
      commit('auth_error', err)
      localStorage.removeItem('token')
   
    })
 
     },
     	    logout({commit}, payload) {
          
    commit('logout')
     axios.get('/api/vue/logout')
    .then(resp => {
      
            localStorage.removeItem('token')

    });
    
 
     },
            
            addNote({commit}, payload){

           commit('set_clear_app_msgs');
      axios.post('/api/vue/note', {
                title: payload.title,
                description: payload.description,
            })
      .then(resp => {
        if(resp.data === true){
              dispatch('get_all_notes');
                            commit('set_app_msgs', {
                                msg:"Note Adding Successfully",
                                color: "success",
                                icon: "check"
                            });
                             this.$router.push({name: 'notes'});
                              
                            }
                            else
                            {
                               commit('set_app_msgs', {
                            msg:"Error!",
                            color: "error",
                            icon: "error"
                        });
                            }
       

      });
  
},
            editNote({commit,dispatch}, payload){

           commit('set_clear_app_msgs');
          
      axios.put('/api/vue/note/'+payload.id,{
                title: payload.title,
                description: payload.description,
            })
      .then(resp => {
        console.log(resp.data );
        if(resp.data === true){
              dispatch('get_all_notes');
                            commit('set_app_msgs', {
                                msg:"Note Updating Successfully",
                                color: "success",
                                icon: "check"
                            });
                             
                              
                            }
                            else
                            {
                               commit('set_app_msgs', {
                            msg:"Error!",
                            color: "error",
                            icon: "error"
                        });
                            }
       

      });
  
},

  async get_all_notes({commit}){
            await axios.get('/api/vue/note')
                .then(function (response) {

                    commit('set_notes', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
                delete_note({commit, dispatch}, payload){
         
            commit('set_clear_app_msgs');

            axios.delete('/api/vue/note/'+payload.id).then(resp => {

                    if(resp.data === true){

                         dispatch('get_all_notes');


                         commit('set_app_msgs', {
                                    msg:"Note Deleted Successfully",
                                    color: "success",
                                    icon: "check"
                                });


                    }
                    else{

                        commit('set_app_msgs', {
                            msg:"Error!",
                            color: "error",
                            icon: "error"
                        });
                    }
                })
        },



 },

 getters : {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
    get_app_msg: state => {
            return {
              
                "app_snackbar_msgs": state.app_snackbar_msgs,
                "app_snackbar_color": state.app_snackbar_color,
                "app_snackbar_icon":state.app_snackbar_icon
            }
        },
         get_notes: state =>{
            return state.all_notes;
        },
        
}


});
