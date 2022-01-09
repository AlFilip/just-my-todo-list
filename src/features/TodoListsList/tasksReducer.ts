import { domainTaskType, resCodes, tasksApi } from "../../Api/Api"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { todosActions } from './index'
import { authActions } from '../Auth'
import { statusType } from '../Application/appReducer'


export type taskType = domainTaskType & {
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
        addCase( todosActions.addTodoList.fulfilled, (state, { payload: { item: { id } } }) => {
            state[id] = []
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
            const { todoListId, task } = action.meta.arg
            state[todoListId] = state[todoListId].map( m => m.id === task.id ? {
                ...task,
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

        addCase( authActions.logout.fulfilled, () => {
            return {}
        } )
    },
} )


const fetchTasks = createAsyncThunk( 'tasks/fetchTasks', async (todoListId: string, { rejectWithValue }) => {
    try {
        const { data: { items } } = await tasksApi.getTasks( todoListId )
        return { todoListId, items }
    } catch (e) {
        return rejectWithValue( e )
    }
} )

const createTask = createAsyncThunk( 'tasks/createTask', async (payload: { todoListId: string, title: string }, thunkApi) => {
    const { rejectWithValue } = thunkApi
    const { todoListId, title } = payload
    try {
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await tasksApi.addTask( todoListId, title )
        if (status === 200 && resultCode === resCodes.success) {
            return { todoListId, item }
        }

        if (errorMessage) {
            return rejectWithValue( errorMessage )
        }

    } catch (e) {
        return rejectWithValue( e )
    }
} )

const deleteTask = createAsyncThunk( 'tasks/deleteTask', async (payload: { todoListId: string, taskId: string }, thunkApi) => {
    const { todoListId, taskId } = payload
    const {  rejectWithValue } = thunkApi
    try {
        const { data: { resultCode, messages: [errorMessage] } } = await tasksApi.deleteTask( todoListId, taskId )
        if (resultCode === resCodes.success) {
            return { todoListId, taskId }
        }
        if (errorMessage) {
            return rejectWithValue( { error: errorMessage } )
        }
    } catch (e) {
        rejectWithValue( e )
    }
} )

const updateTask = createAsyncThunk( 'tasks/updateTask', async (payload: { todoListId: string, task: taskType }, thunkApi) => {
    const { todoListId, task } = payload
    const { rejectWithValue } = thunkApi
    try {
        const { status, data: { resultCode, messages: [errorMessage] } } = await tasksApi.updateTask( todoListId, task )
        if (status === 200 && resultCode === resCodes.success) {
            return { todoListId, task }
        }
        if (errorMessage) {
            return rejectWithValue( { error: errorMessage } )
        }
    } catch (e) {
        return rejectWithValue( e )
    }
} )

export const asyncActions = {
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
}
