import Vue from 'vue';
import FastClick from 'fastclick';

import App from './App';
import router from './router';
import axios from 'axios';
Vue.prototype.$http = axios;
import http from './http';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

FastClick.attach(document.body);

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app-box');