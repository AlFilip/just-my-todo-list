import { resCodes, tasksApi, TaskStatuses } from "../Api/Api"
import { thunkType } from '../redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus } from './appReducer'


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
        setTasksToState(state, { payload: { todoListId, items } }: PayloadAction<{ todoListId: string, items: taskType[] }>) {
            state[todoListId] = items
        },

    },
} )

const tasksReducer = slice.reducer

export const { addTaskToState, removeTaskFromState, updateTaskInState, setTasksToState } = slice.actions


export const initTasks = (todoListId: string): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { data: { items, error }, status } = await tasksApi.getTasks( todoListId )
        if (status === 200 && !error) {
            dispatch( setTasksToState( { todoListId, items } ) )
        }
        error && console.log( error )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}

export const createTask = (todoListId: string, title: string): thunkType => async dispatch => {
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await tasksApi.addTask( todoListId, title )
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( addTaskToState( { todoListId, item } ) )
        }
        errorMessage
        && console.log( errorMessage )
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
            errorMessage
            && console.log( errorMessage )
        }
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
            errorMessage
            && console.log( errorMessage )
        }
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}


export default tasksReducer
