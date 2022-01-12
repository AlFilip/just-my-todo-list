import { DomainTodoListType, ResCodes, todoListApi } from "../../Api/Api"
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authActions } from '../Auth'
import { tasksActions } from './'
import { StatusType } from '../../utils/types'
import { handleServerApiErrors, handleServerNetworkErrors } from '../../utils/error-utils'


export type TodoListType = DomainTodoListType & {
    todoStatus: StatusType
}
const initState: TodoListType[] = []

export const slice = createSlice( {
    name: 'todo',
    initialState: initState,
    reducers: {
        updateTodoStatus(state, { payload: { id, status } }: PayloadAction<{ id: string, status: StatusType }>) {
            return state.map( m => m.id === id ? { ...m, todoStatus: status } : m )
        },
    },
    extraReducers: ({ addCase }) => {
        addCase( addTodoList.fulfilled, (state, action) => {
            if (action.payload) {
                const { item } = action.payload
                state.unshift( { ...item, todoStatus: 'idle' } )
            }
        } )
        addCase( removeTodoList.pending, (state, action) => {
            const { todoListId } = action.meta.arg
            const todo = state.find( f => f.id === todoListId )
            if (todo) {
                todo.todoStatus = 'loading'
            }
        } )
        addCase( removeTodoList.fulfilled, (state, action) => {
            if (action.payload) {
                const { todoListId } = action.payload
                const index = state.findIndex( f => f.id === todoListId )
                state.splice( index, 1 )
            }
        } )
        addCase( removeTodoList.rejected, (state, action) => {
            const { todoListId } = action.meta.arg
            const todo = state.find( f => f.id === todoListId )
            if (todo) {
                todo.todoStatus = 'idle'
            }
        } )

        addCase( updateTodoName.pending, (state, action) => {
            const { todoListId } = action.meta.arg
            const todo = state.find( f => f.id === todoListId )
            if (todo) {
                todo.todoStatus = 'loading'
            }
        } )
        addCase( updateTodoName.fulfilled, (state, action) => {
            if (action.payload) {
                const { todoListId, title } = action.payload
                const todo = state.find( f => f.id === todoListId )
                if (todo) {
                    todo.title = title
                    todo.todoStatus = 'idle'
                }
            }
        } )
        addCase( updateTodoName.rejected, (state, action) => {
            const { todoListId } = action.meta.arg
            const todo = state.find( f => f.id === todoListId )
            if (todo) {
                todo.todoStatus = 'idle'
            }
        } )
        addCase( getTodos.fulfilled, (state, action) => {
            if (action.payload) {
                const { items } = action.payload
                return [...items] as TodoListType[]
            }
        } )
        addCase( authActions.logout.fulfilled, () => [] )
    },
} )

const addTodoList = createAsyncThunk( 'todo/addTodoList', async (title: string, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const { data: { resultCode, data: { item }, messages: [errorMessage] } } = await todoListApi.createTodoList( title )
        if (resultCode === ResCodes.success) {
            return { item }
        }
        return handleServerApiErrors( errorMessage, rejectWithValue )
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )
    }
} )

const getTodos = createAsyncThunk( 'todo/getTodos', async (ar, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        const { data } = await todoListApi.getTodoLists()
        const promises = data.map( todo => dispatch( tasksActions.fetchTasks( todo.id ) ) )
        await Promise.all( promises )
        return { items: data.map( todo => ( { ...todo, todoStatus: 'idle' } ) ) }
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )
    }
} )

const removeTodoList = createAsyncThunk( 'todo/removeTodoList', async (arg: { todoListId: string }, thunkApi) => {
    const { rejectWithValue } = thunkApi
    const { todoListId } = arg
    try {
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.removeTodoList( todoListId )
        if (status === 200 && resultCode === ResCodes.success) {
            return { todoListId }
        }
        return handleServerApiErrors( errorMessage, rejectWithValue )
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )
    }
} )

const updateTodoName = createAsyncThunk<{ todoListId: string, title: string }, { todoListId: string; title: string; }>( 'todo/updateTodo', async (arg: { todoListId: string, title: string }, thunkAPI) => {
    const { title, todoListId } = arg
    const { rejectWithValue } = thunkAPI
    try {
        const { data: { resultCode, messages: [errorMessage] } } = await todoListApi.updateTodoTitle( todoListId, title )
        if (resultCode === ResCodes.success) {
            return { todoListId, title }
        }
        return handleServerApiErrors( errorMessage, rejectWithValue )
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )
    }
} )

export const asyncActions = {
    addTodoList,
    getTodos,
    removeTodoList,
    updateTodoName,
}
