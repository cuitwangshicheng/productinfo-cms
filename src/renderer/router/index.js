import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/pages/index').default
    },
    {
      path: '/project',
      name: 'project-index',
      component: require('@/pages/project/index').default
    },
    {
      path: '/project/add',
      name: 'project-add',
      component: require('@/pages/project/add').default
    },
    {
      path: '/project/detail/:id',
      name: 'project-detail',
      component: require('@/pages/project/detail').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
