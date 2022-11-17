import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TodoItem from '@/views/todoItem.vue'
import AddTodo from '@/views/addTodo.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Todos',
    component: TodoItem
  },
  {
    path: '/new',
    name: 'AddTodo',
    component: AddTodo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
