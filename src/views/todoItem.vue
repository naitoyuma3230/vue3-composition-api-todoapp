<template>
  <h2>TODO一覧</h2>
  <div v-if="error">
    {{ error }}
  </div>
  <!-- 非同期コンポーネントをラップするSuspense -->
  <!-- fallbackスロットを使用したローディング画面 -->
  <Suspense>
    <template #default>
    <AsyncTodos />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
  <router-link to="/new">新規作成</router-link>
</template>

<script lang="ts">
import { defineComponent, ref, onErrorCaptured } from 'vue'
import AsyncTodos from '@/components/AsyncTodos.vue'

export default defineComponent({
  components: {
    AsyncTodos
  },
  setup () {
    const error = ref<unknown>(null)
    // コンポーネント内のエラーをキャッチ
    onErrorCaptured((e) => {
      error.value = e
      return true
    })

    return {
      error
    }
  }
})
</script>
