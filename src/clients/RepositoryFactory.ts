import { TodoClient } from '@/clients/TodoClient'
import { TodoClientInterface } from './TodoClient/types'
import { MockTodoClient } from '@/clients/TodoClient/mock'

export const TODOS = 'todos'

export interface Repositories {
  [TODOS]: TodoClientInterface;
}

// LocalStrageを使用するか、mock.tsを使用するか
export default {
  [TODOS]:
    process.env.NODE_ENV === 'development'
      ? new MockTodoClient()
      : new TodoClient()
} as Repositories
