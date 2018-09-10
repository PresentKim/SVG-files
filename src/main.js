import 'babel-polyfill'
import 'event-source-polyfill'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter);

new Vue({
	el: '#app',
	render: h => h(App),
	router: new VueRouter()
});
