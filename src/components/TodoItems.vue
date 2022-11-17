<template>
  <div class="card">
    <div>
      <span class="title" @click="clickTitle">{{ todo.title }}</span>
      <span class="status" :class="todo.status">{{ todo.status }}</span>
    </div>
    <div class="body">作成日：{{ formatDate }}</div>
    <hr />
    <div class="action">
      <button @click="clickDelete">削除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Todo } from '@/store/todo/types'
import { computed, defineComponent, isRef, PropType, Ref, ref } from 'vue'
export default defineComponent({
  props: {
    todo: {
      // ProptypeでimportしたTodo型を指定
      type: Object as PropType<Todo>,
      required: true
    }
  },
  // emitsはsetupの外側で宣言？
  emits: ['clickDelete', 'clickTitle'],
  setup (props, { emit }) {
    const clickDelete = () => {
      // 親コンポーネントのイベントに引数を渡す
      emit('clickDelete', props.todo.id)
    }

    const clickTitle = () => {
      emit('clickTitle', props.todo.id)
    }

    // 引数のdataはData型 or Ref型<date> ,リアクティブなジェネリクスに指定した型
    const useFormatDate = (date: Date | Ref<Date>) => {
      // isRef():リアクティブでなかったらref()でリアクティブ化
      const dateRef = isRef(date) ? date : ref(date)

      // 関数のreturnにcomputedのreturnを重ねる方法
      return computed(() => {
        return `${dateRef.value.getFullYear()}/${// ②
          dateRef.value.getMonth() + 1
        }/${dateRef.value.getDate()}`
      })
    }

    // 関数の実行とformatDateの作成
    const formatDate = useFormatDate(props.todo.createdAt)

    return {
      clickDelete,
      clickTitle,
      formatDate
    }
  }
})
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  border: 1px solid;
  box-shadow: 2px 2px 4px gray;
  width: 250px;
}

.title {
  font-weight: 400;
  font-size: 25px;
  padding: 5px;
}

.status {
  padding: 3px;
}

.waiting {
  background-color: #e53935;
}

.working {
  background-color: #80cbc4;
}

.completed {
  background-color: #42a5f5;
}

.pending {
  background-color: #ffee58;
}

.body {
  margin: 5px;
}

.action {
  margin: 5px;
}
</style>
