import { thunkType } from '../redux/store'
import { initAuthData } from './authReducer'
import { getTodos } from './todoListReducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type statusType = 'idle' | 'loading'


const initState = {
    isInit: false,
    status: 'loading' as statusType,
    error: null as null | string,
}
type appStateType = typeof initState

const slice = createSlice( {
    name: 'app',
    initialState: initState,
    reducers: {
        setInit(state: appStateType) {
            state.isInit = true
            state.status = 'idle'
        },
        setAppStatus(state: appStateType, { payload: { status } }: PayloadAction<{ status: statusType }>) {
            state.status = status
        },
        setError(state: appStateType, { payload: { error } }: PayloadAction<{ error: string | null }>) {
            state.error = error
        },
    },
} )

const appReducer = slice.reducer
export const { setInit, setAppStatus, setError } = slice.actions


export const initApp = (): thunkType => async dispatch => {
    try {
        const isAuthCompleted = await dispatch( initAuthData() )
        isAuthCompleted && dispatch( getTodos() )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
}

export default appReducer


















