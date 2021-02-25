import VueRouter from 'vue-router'
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import Home from './pages/Comment/index'

const router = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register }
    ]
})

export default router
