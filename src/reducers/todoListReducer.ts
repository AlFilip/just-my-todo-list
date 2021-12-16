import { resCodes, todoListApi } from "../Api/Api"
import { thunkType } from '../redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type todoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
const initState: todoListType[] = []

const slice = createSlice( {
    name: 'todo',
    initialState: initState,
    reducers: {
        addTodoToState(state, { payload: { item } }: PayloadAction<{ item: todoListType }>) {
            state.unshift( item )
        },
        removeTodoFromState(state, { payload: { id } }: PayloadAction<{ id: string }>) {
            const index = state.findIndex( f => f.id === id )
            state.splice( index, 1 )
        },
        renameTodoInState(state, { payload: { todoListId, title } }: PayloadAction<{ todoListId: string, title: string }>) {
            const todo = state.find( f => f.id === todoListId )
            if (todo) {
                todo.title = title
            }
        },
        setTodoListsToState(state, { payload: { items } }: PayloadAction<{ items: todoListType[] }>) {
            state.push(...items)
        },
    },
} )

const todoListReducer = slice.reducer
const { setTodoListsToState, renameTodoInState, addTodoToState, removeTodoFromState } = slice.actions

export const addTodoList = (title: string): thunkType => async dispatch => {
    try {
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await todoListApi.createTodoList( title )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( addTodoToState( { item } ) )
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
            dispatch( setTodoListsToState( { items: data } ) )
        }
    } catch (e) {
        console.log( e )
    }
}

export const removeTodoList = (id: string): thunkType => async dispatch => {
    try {
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.removeTodoList( id )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( removeTodoFromState( { id } ) )
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
            dispatch( renameTodoInState( { todoListId, title } ) )
        }
    } catch (e) {
        console.log( e )
    }
}

export default todoListReducer