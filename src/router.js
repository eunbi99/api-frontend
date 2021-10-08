import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', //주소
      name: '',
      component: () =>
        import("./views/Home.vue")
    },
  ]
})
