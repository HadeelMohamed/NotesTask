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
          <span v-if="isLoggedIn" ><a class="nav-link" @click="logout">Logout</a></span>
        </li>
        
      </ul>
    </nav><br />
    <transition name="fade">
      <router-view></router-view>
    </transition>
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
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
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
  
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {


        this.$router.push({ name: 'home' })
        })
      }
    },
  }
</script>
