import { Todo, Params } from '@/store/todo/types'
import { TodoClientInterface } from './types'

export class TodoClient implements TodoClientInterface {
  async getAll () {
    // ローディング画面の確認のためわざと遅らせる
    await new Promise((resolve) => setTimeout(resolve, 3000))
    // resolveは処理が解決した場合の解決済みPromiseオブジェクト(todo)を返す
    return Promise.resolve(
      // Object.keys：keyをループ処理
      Object.keys(localStorage)
        // LocalStorage上ではデータは全て文字列
        // keyをnumber型オブジェクトに変更可能なもののみ取得(id?)
        .filter((key) => !isNaN(Number(key)))
        // JSON.parse でkeyに一致する文字列をオブジェクトに変換
        .map((key) => {
          const todo = JSON.parse(localStorage.getItem(key) as string) as Todo
          todo.createdAt = new Date(todo.createdAt)
          todo.updatedAt = new Date(todo.updatedAt)
          return todo
        })
    )
  }

  get (id: number) {
    const item = localStorage.getItem(String(id))
    if (item === null) {
      // idに一致するデータがない場合、未解決のpromiseオブジェクトを返す
      return Promise.reject(new Error(`id: ${id} is not found`))
    }

    return Promise.resolve(JSON.parse(item) as Todo)
  }

  create (params: Params) {
    const todo = this.intitializeTodo(params)
    // JSON.stringify でオブジェクトを文字列に変換
    localStorage.setItem(String(todo.id), JSON.stringify(todo))
    return Promise.resolve(todo)
  }

  update (id: number, todo: Todo) {
    localStorage.removeItem(String(id))
    todo.updatedAt = new Date()
    // JSON.stringify でオブジェクトを文字列に変換
    localStorage.setItem(String(id), JSON.stringify(todo))
    return Promise.resolve(todo)
  }

  delete (id: number) {
    localStorage.removeItem(String(id))
    return Promise.resolve()
  }

  // 現在時間の登録処理
  // Params = Pick<Todo,'title' | 'description' | 'status'>
  // ParamsはPick＝初期化対象のTodoオブジェクトと…文字列の共用体型？

  intitializeTodo (todo: Params) {
    const date = new Date()
    return {
      id: date.getTime(),
      title: todo.title,
      description: todo.description,
      status: todo.status,
      createdAt: date,
      updatedAt: date
    } as Todo
  }
}
