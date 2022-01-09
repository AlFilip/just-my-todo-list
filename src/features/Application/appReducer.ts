import { authActions } from '../Auth'
import { todosActions } from '../TodoListsList'
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction, statusType } from '../../utils/types'


function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending')
}
function isFulfilledAction(action: AnyAction): action is FulfilledAction {
    return action.type.endsWith('/fulfilled')
}
function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected')
}

const ignoreIdleActionsTypes = [`auth/getAuth`, 'auth/login']

const checkMatch = (type: string) => {
    for (let item of ignoreIdleActionsTypes){
        if (type.match(item)){
            return false
        }
    }
    return true
}

function setIdle(state: appStateType, action: PayloadAction) {
    if (checkMatch(action.type)) {
        state.status = 'idle'
    }
}

function setLoading(state: appStateType) {
    state.status = 'loading'
}

export type appStateType = ReturnType<typeof slice.reducer>

export const slice = createSlice( {
    name: 'app',
    initialState: {
        isInit: false,
        status: 'loading' as statusType,
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

        addMatcher(isPendingAction, setLoading)
        addMatcher(isFulfilledAction, setIdle)
        addMatcher(isRejectedAction, setIdle)
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
        return rejectWithValue( e )
    }
} )

export const asyncActions = {
    initApp,
}



