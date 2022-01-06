import { getAuth } from './authReducer'
import { getTodos } from './todoListReducer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


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

export const initApp = createAsyncThunk('app/initApp',  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const isAuthCompleted = await dispatch( getAuth() )
        if (isAuthCompleted) {
            dispatch( getTodos() )
        }
    } catch (e) {
        return rejectWithValue( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
})
//
// export const initApp_ = (): thunkType => async dispatch => {
//     try {
//         const isAuthCompleted = await dispatch( getAuth() )
//         isAuthCompleted && dispatch( getTodos() )
//     } catch (e) {
//         console.log( e )
//     } finally {
//         dispatch( setAppStatus( { status: 'idle' } ) )
//     }
// }

export default appReducer


















