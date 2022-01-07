import { resCodes, tasksApi, TaskStatuses } from "../Api/Api"
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus } from './appReducer'
import { addTodoList, removeTodoList } from './todoListReducer'
import { logout } from './authReducer'


export type taskType = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type tasksStateType = {
    [todoListId: string]: taskType[]
}

const initState: tasksStateType = {}

const slice = createSlice( {
    name: 'tasks',
    initialState: initState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase( removeTodoList.fulfilled, (state, action) => {
            if (action.payload) {
                const { id } = action.payload
                delete state[id]
            }
        } )
        addCase( addTodoList.fulfilled, (state, { payload: { item: { id } } }) => {
            state[id] = []
        } )

        addCase( fetchTasks.pending, (state) => {

        } )
        addCase( fetchTasks.fulfilled, (state, action) => {
            if (action.payload) {
                const { items, todoListId } = action.payload
                state[todoListId] = items
            }
        } )
        addCase( fetchTasks.rejected, (state, action) => {
            console.log( action )
        } )

        addCase( createTask.fulfilled, (state, action) => {
            if (action.payload) {
                const { todoListId, item } = action.payload
                state[todoListId].unshift( item )
            }
        } )
        addCase( deleteTask.fulfilled, (state, action) => {
            if (action.payload) {
                const { todoListId, taskId } = action.payload
                let tasks = state[todoListId]
                const index = tasks.findIndex( f => f.id === taskId )
                tasks.splice( index, 1 )
            }
        } )
        addCase( updateTask.fulfilled, (state, action) => {
            if (action.payload) {
                const { todoListId, task, task: { id } } = action.payload
                let tasks = state[todoListId]
                const index = tasks.findIndex( f => f.id === id )
                tasks.splice( index, 1, task )
            }
        } )
        addCase(logout.fulfilled, () => {
            return {}
        })

    },
} )

const tasksReducer = slice.reducer


export const fetchTasks = createAsyncThunk( 'tasks/fetchTasks', async (todoListId: string, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { data: { items, error }, status } = await tasksApi.getTasks( todoListId )
        return { todoListId, items }
    } catch (e) {
        return rejectWithValue( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
} )

export const createTask = createAsyncThunk( 'tasks/createTask', async (payload: { todoListId: string, title: string }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    const { todoListId, title } = payload
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await tasksApi.addTask( todoListId, title )
        if (status === 200 && resultCode === resCodes.success) {
            return { todoListId, item }
        }

        if (errorMessage) {
            return rejectWithValue( errorMessage )
        }

    } catch (e) {
        return rejectWithValue( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
} )

export const deleteTask = createAsyncThunk( 'tasks/deleteTask', async (payload: { todoListId: string, taskId: string }, thunkApi) => {
    const { todoListId, taskId } = payload
    const { dispatch, rejectWithValue } = thunkApi

    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await tasksApi.deleteTask( todoListId, taskId )
        if (status === 200 && resultCode === resCodes.success) {
            // dispatch( removeTaskFromState( { todoListId, taskId } ) )
            return { todoListId, taskId }
        }
        if (errorMessage) {
            return rejectWithValue( { error: errorMessage } )
        }
        // errorMessage
        // && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        rejectWithValue( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
} )

export const updateTask = createAsyncThunk( 'tasks/updateTask', async (payload: { todoListId: string, task: taskType }, thunkApi) => {
    const { todoListId, task } = payload
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await tasksApi.updateTask( todoListId, task )
        if (status === 200 && resultCode === resCodes.success) {
            // dispatch( updateTaskInState( { todoListId, task } ) )
            return { todoListId, task }
        }
        if (errorMessage) {
            return rejectWithValue( { error: errorMessage } )
        }
        // errorMessage
        // && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        return rejectWithValue( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
} )

// export const updateTask_ = (todoListId: string, task: taskType): thunkType => async dispatch => {
//     try {
//         dispatch( setAppStatus( { status: 'loading' } ) )
//         const { status, data: { resultCode, messages: [errorMessage] } } = await tasksApi.updateTask( todoListId, task )
//         if (status === 200 && resultCode === resCodes.success) {
//             dispatch( updateTaskInState( { todoListId, task } ) )
//         }
//         errorMessage
//         && dispatch( setError( { error: errorMessage } ) )
//     } catch (e) {
//         console.log( e )
//     } finally {
//         dispatch( setAppStatus( { status: 'idle' } ) )
//     }
// }


export default tasksReducer
