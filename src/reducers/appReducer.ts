import { getAuth, login, logout } from './authReducer'
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
    extraReducers: ({addCase}) => {
        addCase(logout.pending, (state) => {
            state.status = 'loading'
        })
        addCase(logout.fulfilled, state => {
            state.status = 'idle'
        })
        addCase(logout.rejected, state => {
            state.status = 'idle'
        })
        addCase(login.pending, state => {
            state.status = 'loading'
        })
        addCase( initApp.rejected, state => {
            state.status = 'idle'
        })
        addCase( getAuth.rejected, state => {
            state.status = 'idle'
        })
        addCase( getTodos.rejected, state => {
            state.status = 'idle'
        })
    }
} )

const appReducer = slice.reducer
export const { setInit, setAppStatus, setError } = slice.actions

export const initApp = createAsyncThunk('app/initApp',  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const { payload } = await dispatch( getAuth() )
        if (payload) {
            dispatch( getTodos() )
        }
    } catch (e) {
        return rejectWithValue( e )
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


















