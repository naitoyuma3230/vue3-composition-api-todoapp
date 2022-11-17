<template>
  <h2>TODO一覧</h2>
  <ul>
    <todo-items
      v-for="todo in todoStore.state.todos"
      :key="todo.id"
      :todo="todo"
      @click-title="clickTitle"
      @click-delete="clickDelete"
    >
    </todo-items>
  </ul>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import { todoKey } from '@/store/todo'
import TodoItems from '@/components/TodoItems.vue'

export default defineComponent({
  name: 'TodoItem',
  components: {
    TodoItems
  },
  setup () {
    const todoStore = inject(todoKey)
    if (!todoStore) {
      throw new Error('todoStore is not provided')
    }
    const router = useRouter()

    const clickDelete = (id: number) => {
      todoStore.deleteTodo(id)
    }

    const clickTitle = (id: number) => {
      router.push(`/edit/${id}`)
    }

    return {
      todoStore,
      clickDelete,
      clickTitle
    }
  }
})
</script>
