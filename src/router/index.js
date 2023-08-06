import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/auth'
  },
  {
    path: "/auth",
    name: "auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "../views/AuthView.vue"),
  },
  {
    path: "/user-todos",
    name: "user-todos",
    component: () =>
      import(/* webpackChunkName: "user-todos" */ "../views/UserTodosView.vue"),
  },
  {
    path: "*",
    redirect: "/user-todos"
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  if (to.path === '/user-todos' && !store.getters['user/isLoggedIn']) {
    next('/auth')
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
