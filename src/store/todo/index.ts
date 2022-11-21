import { InjectionKey, reactive, readonly } from 'vue'
import { Todo, TodoState, TodoStore, Params } from '@/store/todo/types'
import Repository, { TODOS } from '@/clients/RepositoryFactory'

const TodoRepository = Repository[TODOS]

// Interface,type実装

// Todo型オブジェクトの配列
// const mockTodo: Todo[] = [
//   {
//     id: 1,
//     title: 'todo1',
//     description: '1つ目',
//     status: 'waiting',
//     createdAt: new Date('2020-12-01'),
//     updatedAt: new Date('2020-12-01')
//   },
//   {
//     id: 2,
//     title: 'todo2',
//     description: '2つ目',
//     status: 'waiting',
//     createdAt: new Date('2020-12-02'),
//     updatedAt: new Date('2020-12-02')
//   },
//   {
//     id: 3,
//     title: 'todo3',
//     description: '3つ目',
//     status: 'working',
//     createdAt: new Date('2020-12-03'),
//     updatedAt: new Date('2020-12-04')
//   }
// ]

// 型をTodoStateで解決しreactive()でオブジェクトをリアクティブ対応させる
const state = reactive<TodoState>({
  // TodoStateはTodoオブジェクトの配列
  // todos: mockTodo
  todos: []
})

// localstorageからgetAll
const fetchTodos = async () => {
  state.todos = await TodoRepository.getAll()
}

// localstorageからget(id)
const fetchTodo = async (id: number) => {
  const todo = await TodoRepository.get(id)
  state.todos.push(todo)
}

const getTodo = (id: number) => {
// リアクティブ化したstate.todosからidに一致するtodoを取得
  const todo = state.todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  return todo
}

// 現在時間の登録をしてtodosリストに追加
const addTodo = async (todo: Params) => {
  // Localstorage操作を行う非同期関数
  // 解決済みPromiseオブジェクトを返す
  const result = await TodoRepository.create(todo)
  state.todos.push(result)
}

// 引数：todoオブジェクト、id
// todosからidに一致するtodoのindexを取得し、渡されたtodoオブジェクトで更新する
const updateTodo = async (id: number, todo: Todo) => {
  // Localstorage操作を行う非同期関数
  const result = await TodoRepository.update(id, todo)
  const index = state.todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  state.todos[index] = result
}

// 引数id
// idに一致しないtodoでリストを作り直す（一致するtodoの削除）
const deleteTodo = (id: number) => {
  TodoRepository.delete(id)
  state.todos = state.todos.filter((todo) => todo.id !== id)
}

// todoStoreの実装
// stateをリアクティブにしたstate
// 各メソッドを設定（keyとvalueの変数名が同じ時valueを省略できる）
const todoStore: TodoStore = {
  state: readonly(state),
  fetchTodos,
  fetchTodo,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo

}

// defaultでは名前なしexportとなり1つのオブジェクトのみ出力できる
// ファイルimport時に{ } 不要で任意の名前を指定する
export default todoStore

// 一方名前付きの場合,import側は指定されたオブジェクト名を{}内で指定し使用する

// todoStoreをprovide/inject するために必要なキーを宣言
// InjectionKey をジェネリクスで型指定をすると、provide/injection をした際に型検査が効く
// Symbolは一意の文字列を返す
export const todoKey: InjectionKey<TodoStore> = Symbol('todo')
