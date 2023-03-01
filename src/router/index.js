import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogIn.vue'
import DashBoard from '../views/DashBoard.vue'
import AddPost from '../views/AddPost.vue'
import MyProfile from '../views/MyProfile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dashboard/:username',
    name: 'DashBoard',
    component: DashBoard,
    props: true
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/search',
    name: 'Search',
    // component: Search
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
