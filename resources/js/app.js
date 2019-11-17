require('./bootstrap');

window.Vue = require('vue');
import Vuex from 'vuex';
import store from "./store/store";
import router from './routes'

import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'


import App from "./App.vue"





Vue.use(Vuetify);
Vue.use(Vuex);




new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    router: router,
    store,
    render: app => app(App)
});