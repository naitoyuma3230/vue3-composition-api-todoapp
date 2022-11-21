import { DeepReadonly } from 'vue'

// 共用体型typeで中身は次のいずれかの文字列
export type Status = 'waiting' | 'working' | 'completed' | 'pending';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoState {
// 配列の中身がTodoオブジェクト
  todos: Todo[];
}

// Paramsの型typeを宣言、Pick<T, "key1" | "key2" | "key3">はT型からkey部分を取り出した型を作成できる
// この場合、{title:string, discription:string, status:Status} のオブジェクトの型宣言となる
// 今後リアクティブに指定したいプロパティのみをParamに定義している
export type Params = Pick<Todo, 'title' | 'description' | 'status'>;

export interface TodoStore {
  // DeepReadOnly（メソッドでの変更のみ可能なinterface）のジェネリクスをTodoState型で解決
  state: DeepReadonly<TodoState>;
  fetchTodos: () => void;
  fetchTodo: (id: number) => void;
  getTodo: (id: number) => void;
  addTodo: (todo: Params) => void;
  updateTodo: (id: number, todo: Todo) => void;
  deleteTodo: (id: number) => void;
}
