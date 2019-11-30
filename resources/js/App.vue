<template>
     
  <div class="container">


    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        
        <li class="nav-item"  v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item"  v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item"  v-if="isLoggedIn">
          <router-link to="/notes" class="nav-link">Notes</router-link>
        </li>
        <li class="nav-item"  v-if="isLoggedIn">
          <router-link to="/createnote" class="nav-link">Create Note</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <span v-if="isLoggedIn" ><a class="nav-link" @click="logout()">Logout</a></span>
        </li>
        
      </ul>
    </nav><br />

    <transition name="fade">
      <router-view></router-view>
    </transition>
     <v-app id="inspire">
    <div class="text-center">
      <!-- <v-btn
        dark
        color="red darken-2"
        @click="snackbar = true"
      >
        Open Snackbar
      </v-btn> -->
  
     <v-snackbar
            v-model="snackbar"
            :color="color"
            top
            style="z-index: 50"
        >
            <v-icon smaller color="white">{{icon}}</v-icon><span style="font-size: larger;color: white;">{{ text }}</span>
            <v-btn
                dark
                text
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
  </v-app>
  

  </div>

</template>
<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>

<script>

  export default {
      data:()=>{
            return{
                
                snackbar: false,
                color: "",
                text: "",
                icon: "",
                
            }
          },

    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      get_app_msg: function(){return  this.$store.getters.get_app_msg},
    },
created: function () {
  axios.interceptors.response.use(undefined, function (err) {
    
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        this.$store.dispatch(logout)
      // you can also redirect to /login if needed !
      }
      throw err;
    });
  });



},
watch:
{
 get_app_msg(data) {
                if(data.app_snackbar_msgs !== null) {
                    this.text = data.app_snackbar_msgs;
                    this.color = data.app_snackbar_color;
                    this.icon = data.app_snackbar_icon;
                    this.snackbar = true;
                }
            },
},
  
    methods: {
      logout: function () {
               
    this.$store.commit('logout');
     axios.get('/vue/logout')
    .then(resp => {
      
      localStorage.removeItem('token');
      this.$router.push({name:'login'});

    });
    
 
    }
  }
}
</script>
