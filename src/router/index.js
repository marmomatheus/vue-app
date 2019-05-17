import Vue from 'vue'
import Router from 'vue-router'
import Master from './../components/master/App.vue'
import routes from './loader'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Master,
      children: routes
    }
  ]
})
