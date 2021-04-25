import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

console.log("process.env.VUE_APP_BACKEND_URL:" + process.env.BACKEND_URL);

const http = axios.create({
  // baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:8080/api/',
  baseURL: process.env.VUE_APP_BACKEND_URL || 'http://localhost:8080/api/',
});
console.log("process.env: %O" + JSON.stringify(process.env));

Vue.prototype.$http = http;


Vue.use(BootstrapVue);

Vue.config.productionTip = false;

library.add(faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: (h) => h(App),
}).$mount('#app');
