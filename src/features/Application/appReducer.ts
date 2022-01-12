import { authActions } from '../Auth'
import { tasksActions, todosActions } from '../TodoListsList'
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommonErrorType, FulfilledAction, PendingAction, RejectedAction, StatusType } from '../../utils/types'
import { handleServerNetworkErrors } from '../../utils/error-utils'


function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith( '/pending' )
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
    return action.type.endsWith( '/fulfilled' )
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith( '/rejected' )
}

const ignoreIdleActionsTypes = [`auth/getAuth`, 'auth/login']

const checkMatch = (type: string) => {
    for (let item of ignoreIdleActionsTypes) {
        if (type.match( item )) {
            return false
        }
    }
    return true
}

function setIdle(state: AppStateType, action: PayloadAction) {
    if (checkMatch( action.type )) {
        state.status = 'idle'
    }
}

function setError(state: AppStateType, action: PayloadAction) {
    if (checkMatch( action.type )) {
        state.status = 'idle'
    }
    state.error = ( action.payload as unknown as CommonErrorType ).error
}

function setLoading(state: AppStateType) {
    state.status = 'loading'
}

export type AppStateType = ReturnType<typeof slice.reducer>

export const slice = createSlice( {
    name: 'app',
    initialState: {
        isInit: false,
        status: 'loading' as StatusType,
        error: null as null | string,
    },
    reducers: {
        setError(state, { payload: { error } }: PayloadAction<{ error: string | null }>) {
            state.error = error
        },
    },
    extraReducers: ({ addCase, addMatcher }) => {
        addCase( initApp.fulfilled, state => {
            state.status = 'idle'
            state.isInit = true
        } )
        // addCase( todosActions.getTodos.rejected, (state, action) => {
        //     state.error = ( action.payload as CommonErrorType ).error
        // } )
        // addCase( todosActions.updateTodoName.rejected, (state, action) => {
        //     state.error = ( action.payload as CommonErrorType ).error
        // } )
        // addCase( todosActions.addTodoList.rejected, (state, action) => {
        //     state.error = ( action.payload as CommonErrorType ).error
        // } )
        // addCase( tasksActions.createTask.rejected, (state, action) => {
        //     state.error = ( action.payload as CommonErrorType ).error
        // } )
        // addCase( tasksActions.fetchTasks.rejected, (state, action) => {
        //     state.error = ( action.payload as CommonErrorType ).error
        // } )
        // addCase( tasksActions.updateTask.rejected, (state, action) => {
        //     state.error = ( action.payload as CommonErrorType ).error
        // } )
        // addCase( authActions.login.rejected, (state, action) => {
        //     state.error = ( action.payload as CommonErrorType ).error
        //     state.status = 'idle'
        // } )

        addMatcher( isPendingAction, setLoading )
        addMatcher( isFulfilledAction, setIdle )
        addMatcher( isRejectedAction, setError )
    },
} )

const initApp = createAsyncThunk( 'app/initApp', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        const { payload } = await dispatch( authActions.getAuth() )
        if (payload) {
            return await dispatch( todosActions.getTodos() )
        }
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )
    }
} )

export const asyncActions = {
    initApp,
}
