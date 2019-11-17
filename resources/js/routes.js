import Vue from 'vue'
import VueRouter from 'vue-router';
import store from './store/store'

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Notes from './components/Notes.vue';
import CreateNote from './components/CreateNote.vue';







Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
        path: '/register',
        name: 'register',
        component: Register
    },{
        path: '/login',
        name: 'login',
        component: Login
    }
    ,{
        path: '/notes',
        name: 'notes',
        component: Notes,
         meta: { 
        requiresAuth: true
      }

    },
     {
      name: 'createnote',
      path: '/createnote',
      component: CreateNote,
        meta: { 
        requiresAuth: true
      }
  },
        ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router;
