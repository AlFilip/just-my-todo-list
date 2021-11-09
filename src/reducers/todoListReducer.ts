enum ACTION_TYPES {
    REMOVE_TODO_LIST = 'todoList/REMOVE_TODO_LIST',
    ADD_TODO_LIST = 'todoList/ADD_TODO_LIST',
    CHANGE_TODO_TITLE = 'todoList/CHANGE_TITLE',
}

export type todoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
const initState: todoListType[] = []

const todoListReducer = (state = initState, action: allTodoListReducerTypes): Array<todoListType> => {
    switch (action.type) {
        case ACTION_TYPES.ADD_TODO_LIST:
            return [...state, action.todo]
        case ACTION_TYPES.REMOVE_TODO_LIST:
            return state.filter(f => f.id !== action.id)
        case ACTION_TYPES.CHANGE_TODO_TITLE:
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        default:
            return state
    }
}
type allTodoListReducerTypes = addTodoToStateActionType
    | removeTodoFromStateActionType
    | renameTodoInStateActionType


export const addTodoToState = (todo: todoListType) => ({
    type: ACTION_TYPES.ADD_TODO_LIST, todo
} as const)
type addTodoToStateActionType = ReturnType<typeof addTodoToState>

export const removeTodoFromState = (id: string) => ({
    type: ACTION_TYPES.REMOVE_TODO_LIST,
    id
} as const)

type removeTodoFromStateActionType = ReturnType<typeof removeTodoFromState>

export const renameTodoInState = (id: string, title: string) => ({
    type: ACTION_TYPES.CHANGE_TODO_TITLE,
    id, title
} as const)

type renameTodoInStateActionType = ReturnType<typeof renameTodoInState>




export default todoListReducer