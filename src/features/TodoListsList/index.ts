import * as todosSelectors from './selectors'
import { slice as todoSlice, asyncActions as todoAsyncActions } from './todoListReducer'
import { slice as tasksSlice, asyncActions as tasksAsyncActions } from './tasksReducer'
import {TodoListsList} from './TodoListList'


const todoListReducer = todoSlice.reducer
const tasksReducer = tasksSlice.reducer
const todosActions = {
    ...todoSlice.actions,
    ...todoAsyncActions,
}

const tasksActions  = {
    ...tasksSlice.actions,
    ...tasksAsyncActions,
}

export {
    todosSelectors,
    todosActions,
    tasksActions,
    todoListReducer,
    tasksReducer,
    TodoListsList,
}