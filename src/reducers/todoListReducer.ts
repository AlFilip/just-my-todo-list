import { resCodes, todoListApi } from "../Api/Api"
import { thunkType } from '../redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus, setError, setInit } from "./appReducer"


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
            state.push( ...items )
        },
    },
} )

const todoListReducer = slice.reducer
const { setTodoListsToState, renameTodoInState, addTodoToState, removeTodoFromState } = slice.actions

export const addTodoList = (title: string): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await todoListApi.createTodoList( title )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( addTodoToState( { item } ) )
        }
        errorMessage
        && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }

}

export const getTodos = (): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { data, status } = await todoListApi.getTodoLists()
        if (status === 200 && data.length) {
            dispatch( setTodoListsToState( { items: data } ) )
            dispatch( setInit() )
        }
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}

export const removeTodoList = (id: string): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.removeTodoList( id )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( removeTodoFromState( { id } ) )
        }
        errorMessage
        && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}

export const updateTodoTitle = (todoListId: string, title: string): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.updateTodoTitle( todoListId, title )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( renameTodoInState( { todoListId, title } ) )
        }
        errorMessage
        && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}

export default todoListReducer