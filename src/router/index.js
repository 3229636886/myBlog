import VueRouter from 'vue-router'
import Vue from "vue"

Vue.use(VueRouter)

const AddBlog = () => import('@/components/AddBlog')
const ShowBlogs = () => import('@/components/ShowBlogs')
const SingleBlog = () => import('@/components/SingleBlog')

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: ShowBlogs
        },
        {
            path: '/addBlog',
            component: AddBlog
        },
        {
            path: '/blog/:id',
            component: SingleBlog
        }
    ]
})

export default router