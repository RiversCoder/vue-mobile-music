import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// 路由懒加载
const Singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}

const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}



export default new Router({
  routes: [
    { path: '/',redirect:'/recommend'},
    { path: '/singer',component:Singer},
    { path: '/rank',component:Rank},
    { path: '/recommend',component:Recommend},
    { path: '/search',component:Search}
  ]
})
