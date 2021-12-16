import { thunkType } from '../redux/store'
import { initAuthData } from './authReducer'
import { getTodos } from './todoListReducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type AppStatusType = 'idle' | 'loading'


const initState = {
    isInit: false,
    status: 'loading' as AppStatusType,
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
        setAppStatus(state: appStateType, { payload: { status } }: PayloadAction<{ status: AppStatusType }>) {
            state.status = status
        },
    },
} )

const appReducer = slice.reducer
export const { setInit, setAppStatus } = slice.actions


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


















