import { resCodes, todoListApi } from "../Api/Api"
import { thunkType } from '../redux/store'


export type todoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}


const initState: todoListType[] = []

const todoListReducer = (state = initState, action: allTodoListReducerActionTypes): todoListType[] => {
    switch (action.type) {
        case 'TODO/ADD_TODO_LIST':
            return [{ ...action.todo }, ...state]
        case 'TODO/REMOVE_TODO_LIST':
            return state.filter( f => f.id !== action.id )
        case 'TODO/CHANGE_TODO_TITLE':
            return state.map( m => m.id === action.id ? { ...m, title: action.title } : m )
        case 'TODO/INIT_TODO':
            return action.items
        default:
            return state
    }
}
export type allTodoListReducerActionTypes = addTodoToStateActionType
    | removeTodoFromStateActionType
    | renameTodoInStateActionType
    | InitTodoListStateActionType


export const addTodoToState = (todo: todoListType) => ( {
    type: 'TODO/ADD_TODO_LIST', todo,
} as const )
type addTodoToStateActionType = ReturnType<typeof addTodoToState>

export const removeTodoFromState = (id: string) => ( {
    type: 'TODO/REMOVE_TODO_LIST',
    id,
} as const )

type removeTodoFromStateActionType = ReturnType<typeof removeTodoFromState>

export const renameTodoInState = (id: string, title: string) => ( {
    type: 'TODO/CHANGE_TODO_TITLE',
    id, title,
} as const )

type renameTodoInStateActionType = ReturnType<typeof renameTodoInState>

export const setTodoListsToState = (items: todoListType[]) => ( {
    type: 'TODO/INIT_TODO',
    items,
} as const )
type InitTodoListStateActionType = ReturnType<typeof setTodoListsToState>

export const addTodoList = (title: string): thunkType => async dispatch => {
    try {
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await todoListApi.createTodoList( title )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( addTodoToState( item ) )
        }
        errorMessage
        && console.log( errorMessage )
    } catch (e) {
        console.log( e )
    }

}

export const getTodos = (): thunkType => async dispatch => {
    try {
        const { data, status } = await todoListApi.getTodoLists()
        if (status === 200 && data.length) {
            dispatch( setTodoListsToState( data ) )
        }
    } catch (e) {
        console.log( e )
    }
}

export const removeTodoList = (id: string): thunkType => async dispatch => {
    try {
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.removeTodoList( id )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( removeTodoFromState( id ) )
        }
        errorMessage
        && console.log( errorMessage )
    } catch (e) {
        console.log( e )
    }
}

export const updateTodoTitle = (todoListId: string, title: string): thunkType => async dispatch => {
    try {
        const { status, data: { resultCode } } = await todoListApi.updateTodoTitle( todoListId, title )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( renameTodoInState( todoListId, title ) )
        }
    } catch (e) {
        console.log( e )
    }
}

export default todoListReducer