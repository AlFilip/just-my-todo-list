import { DomainTaskType, resCodes, tasksApi } from "../../Api/Api"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { todosActions } from './index'
import { authActions } from '../Auth'
import { statusType } from '../../utils/types'
import { handleServerApiErrors, handleServerNetworkErrors } from '../../utils/error-utils'


export type taskType = DomainTaskType & {
    fetchStatus: statusType
}

export type tasksStateType = {
    [todoListId: string]: taskType[]
}

export const slice = createSlice( {
    name: 'tasks',
    initialState: {} as tasksStateType,
    reducers: {},
    extraReducers({ addCase }) {
        addCase( todosActions.removeTodoList.fulfilled, (state, action) => {
            if (action.payload) {
                const { id } = action.payload
                delete state[id]
            }
        } )
        addCase( todosActions.addTodoList.fulfilled, (state, { payload }) => {
            if (payload) {
                const { item: { id } } = payload
                state[id] = []
            }
        } )

        addCase( fetchTasks.fulfilled, (state, action) => {
            if (action.payload) {
                const { items, todoListId } = action.payload
                state[todoListId] = items.map( m => ( { ...m, fetchStatus: 'idle' } ) )
            }
        } )
        addCase( fetchTasks.rejected, (state, action) => {
            console.log( action )
        } )

        addCase( createTask.fulfilled, (state, action) => {
            if (action.payload) {
                const { todoListId, item } = action.payload
                state[todoListId].unshift( { ...item, fetchStatus: 'idle' } )
            }
        } )

        addCase( deleteTask.pending, (state, action) => {
            const { todoListId, taskId } = action.meta.arg
            state[todoListId] = state[todoListId].map( m => m.id === taskId ? {
                ...m,
                fetchStatus: 'loading',
            } : m )
        } )
        addCase( deleteTask.fulfilled, (state, action) => {
            if (action.payload) {
                const { todoListId, taskId } = action.payload
                let tasks = state[todoListId]
                const index = tasks.findIndex( f => f.id === taskId )
                tasks.splice( index, 1 )
            }
        } )

        addCase( updateTask.pending, (state, action) => {
            const { todoListId, task: { id } } = action.meta.arg
            state[todoListId] = state[todoListId].map( m => m.id === id ? {
                ...m,
                fetchStatus: 'loading',
            } : m )
        } )
        addCase( updateTask.fulfilled, (state, action) => {
            if (action.payload) {
                const { todoListId, task, task: { id } } = action.payload
                let tasks = state[todoListId]
                const index = tasks.findIndex( f => f.id === id )
                tasks.splice( index, 1, task )
            }
        } )
        addCase( updateTask.rejected, (state, action) => {
            const { todoListId, task: { id } } = action.meta.arg
            const task = state[todoListId].find( f => f.id === id )
            if (task) {
                task.fetchStatus = 'idle'
            }
        } )

        addCase( authActions.logout.fulfilled, () => ( {} ) )
    },
} )

export type FieldErrorType = { field: string; error: string }
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }

const fetchTasks = createAsyncThunk<{ items: DomainTaskType[], todoListId: string }, string, ThunkError>( 'tasks/fetchTasks', async (todoListId: string, thunkApi) => {
    try {
        const { data: { items } } = await tasksApi.getTasks( todoListId )
        return { todoListId, items }
    } catch (e) {
        return handleServerNetworkErrors( e, thunkApi.rejectWithValue )
    }
} )

const createTask = createAsyncThunk( 'tasks/createTask', async (payload: { todoListId: string, title: string }, thunkApi) => {
    const { rejectWithValue } = thunkApi
    const { todoListId, title } = payload
    try {
        const { data: { data: { item }, resultCode, messages: [errorMessage] } } = await tasksApi.addTask( todoListId, title )
        if (resultCode === resCodes.success) {
            return { todoListId, item }
        }
        return handleServerApiErrors( errorMessage, rejectWithValue )
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )
    }
} )

const deleteTask = createAsyncThunk( 'tasks/deleteTask', async (payload: { todoListId: string, taskId: string }, thunkApi) => {
    const { todoListId, taskId } = payload
    const { rejectWithValue } = thunkApi
    try {
        const { data: { resultCode, messages: [errorMessage] } } = await tasksApi.deleteTask( todoListId, taskId )
        if (resultCode === resCodes.success) {
            return { todoListId, taskId }
        }
        return handleServerApiErrors( errorMessage, rejectWithValue )
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )
    }
} )

const updateTask = createAsyncThunk( 'tasks/updateTask', async (payload: { todoListId: string, task: taskType }, thunkApi) => {
    const { todoListId, task } = payload
    const { rejectWithValue } = thunkApi
    try {
        const { data: { resultCode, messages: [errorMessage] } } = await tasksApi.updateTask( todoListId, task )
        if (resultCode === resCodes.success) {
            return { todoListId, task }
        }
        return handleServerApiErrors( errorMessage, rejectWithValue )
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )
    }
} )

export const asyncActions = {
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
}
