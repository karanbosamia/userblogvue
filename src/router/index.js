import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogIn.vue'
import DashBoard from '../views/DashBoard.vue'
import AddPost from '../views/AddPost.vue'
import MyProfile from '../views/MyProfile.vue'
import SearchUsers from '../views/SearchUsers.vue'
import UserFollowing from '../views/UserFollowing.vue'
import UserFollowers from '../views/UserFollowers.vue'

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
    path: '/dashboard2',
    name: 'DashBoard2',
    component: DashBoard,
    props: true
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
    path: '/myprofile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/following',
    name: 'UserFollowing',
    component: UserFollowing,
  },
  {
    path: '/followers',
    name: 'UserFollowers',
    component: UserFollowers,
  },
  {
    path: '/search',
    name: 'SearchUsers',
    component: SearchUsers
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
