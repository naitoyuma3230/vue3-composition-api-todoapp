<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import TodoStore, { todoKey } from '@/store/todo'

export default defineComponent({
  name: 'App',
  setup () {
    // ルートコンポーネントでprovide(key,store)を実行すると
    // 子コンポーネントでinject(key,store)で呼び出し可能となる
    provide(todoKey, TodoStore)
  }
})
</script>
