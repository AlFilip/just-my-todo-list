import { domainTodoListType, resCodes, todoListApi } from "../Api/Api"
import { thunkType } from '../redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus, setError, setInit, statusType } from "./appReducer"


export type todoListType = domainTodoListType & {
    todoStatus: statusType
}
const initState: todoListType[] = []

const slice = createSlice( {
    name: 'todo',
    initialState: initState,
    reducers: {
        addTodoToState(state, { payload: { item } }: PayloadAction<{ item: domainTodoListType }>) {
            state.unshift( { ...item, todoStatus: 'idle' } )
        },
        removeTodoFromState(state, { payload: { id } }: PayloadAction<{ id: string }>) {
            const index = state.findIndex( f => f.id === id )
            state.splice( index, 1 )
        },
        renameTodoInState(state, { payload: { id, title } }: PayloadAction<{ id: string, title: string }>) {
            const todo = state.find( f => f.id === id )
            if (todo) {
                todo.title = title
            }
        },
        setTodoListsToState(state, { payload: { items } }: PayloadAction<{ items: todoListType[] }>) {
            state.push( ...items )
        },
        updateTodoStatus(state, { payload: { id, status } }: PayloadAction<{ id: string, status: statusType }>) {
            return state.map( m => m.id === id ? { ...m, todoStatus: status } : m )
        },
    },
} )

const todoListReducer = slice.reducer
export const { setTodoListsToState, renameTodoInState, addTodoToState, removeTodoFromState, updateTodoStatus } = slice.actions


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
            dispatch( setTodoListsToState( { items: data.map( m => ( { ...m, todoStatus: 'idle' } ) ) } ) )
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
        dispatch( updateTodoStatus( { id, status: 'loading' } ) )
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

export const updateTodoTitle = (id: string, title: string): thunkType => async dispatch => {
    try {
        dispatch( updateTodoStatus( { id: id, status: 'loading' } ) )
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.updateTodoTitle( id, title )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( renameTodoInState( { id, title } ) )
        }
        errorMessage
        && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
        dispatch( updateTodoStatus( { id: id, status: 'idle' } ) )
    }
}

export default todoListReducer