import { resCodes, tasksApi, TaskStatuses } from "../Api/Api"
import { thunkType } from '../redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus, setError } from './appReducer'
import { addTodoToState, removeTodoFromState } from './todoListReducer'


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
    reducers: {
        addTaskToState(state, action: PayloadAction<{ todoListId: string, item: taskType }>) {
            const { todoListId, item } = action.payload
            state[todoListId].unshift( item )
        },
        removeTaskFromState(state, { payload: { todoListId, taskId } }: PayloadAction<{ todoListId: string, taskId: string }>) {
            let tasks = state[todoListId]
            const index = tasks.findIndex( f => f.id === taskId )
            tasks.splice( index, 1 )
        },
        updateTaskInState(state, { payload: { todoListId, task, task: { id } } }: PayloadAction<{ todoListId: string, task: taskType }>) {
            let tasks = state[todoListId]
            const index = tasks.findIndex( f => f.id === id )
            tasks.splice( index, 1, task )
        },
    },
    extraReducers({ addCase }) {
        addCase( removeTodoFromState, (state, { payload: { id } }) => {
            delete state[id]
        } )
        addCase( addTodoToState, (state, { payload: { item: { id } } }) => {
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

    },
} )

const tasksReducer = slice.reducer

export const { addTaskToState, removeTaskFromState, updateTaskInState } = slice.actions


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

        // if (errorMessage) {
        //     dispatch( setError( { error: errorMessage } ) )
        // }

    } catch (e) {
        return rejectWithValue( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
} )

export const createTask1 = (todoListId: string, title: string): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await tasksApi.addTask( todoListId, title )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( addTaskToState( { todoListId, item } ) )
        }
        errorMessage
        && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}


export const deleteTask = (todoListId: string, taskId: string): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await tasksApi.deleteTask( todoListId, taskId )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( removeTaskFromState( { todoListId, taskId } ) )
        }
        errorMessage
        && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}


export const updateTask = (todoListId: string, task: taskType): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await tasksApi.updateTask( todoListId, task )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( updateTaskInState( { todoListId, task } ) )
        }
        errorMessage
        && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}


export default tasksReducer
