// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
  
Vue.use(VueLazyLoad,{
   loading: require('@/common/image/default.png')
})

const str = require('@/common/data/recommend.json')

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
    store,
	render: h => h(App)
})