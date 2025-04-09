import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/RegisterView.vue'
import TaskView from '@/views/Task/Index.vue'
import TaskCreate from '@/views/Task/Create.vue'
import TaskEdit from '@/views/Task/Edit.vue'
import store from '../store'
import UsersView from '@/views/Users/UsersView.vue'

const routes = [
  {
    path: '/task',
    name: 'task',
    component: TaskView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/task/create',
    name: 'task.create',
    component: TaskCreate,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { guest: true }
  },
  {
    path: '/task/edit/:id',
    name: 'edit-task',
    component: TaskEdit,
    meta: { requiresAuth: true } 
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // Getter desde Vuex
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirige a la vista de login si no está autenticado
  } else if (to.meta.guest && isAuthenticated) {
    next('/task'); // Evita que los usuarios autenticados vuelvan a la pantalla de login
  } else {
    next(); // Continúa normalmente
  }
})

export default router
