import { authApi, loginPayloadType, resCodes } from '../Api/Api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initApp } from './appReducer'


const initState = {
    isAuth: false,
    email: null as null | string,
    id: null as null | number,
    login: null as null | string,
}

const slice = createSlice( {
    name: 'auth',
    initialState: initState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase( getAuth.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload
            }
        } )
        addCase( logout.fulfilled, (state, action) => {
            return initState
        } )

    },
} )

const authReducer = slice.reducer

export const getAuth = createAsyncThunk( 'auth/getAuth', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        const { data: { data, resultCode }, status } = await authApi.me()
        if (status === 200 && resultCode === resCodes.success) {
            return { ...data, isAuth: true }
            // dispatch( setAuthDate( { ...data, isAuth: true } ) )
            // return true
        }
    } catch (e) {
        return rejectWithValue( e )
    }
} )

export const login = createAsyncThunk( 'auth/login', async (arg: loginPayloadType, thunkAPI) => {
    const { data: { fieldsErrors, resultCode } } = await authApi.login( arg )
    if (resultCode === resCodes.success) {
        thunkAPI.dispatch( initApp() )
    }
    if (fieldsErrors.length) {
        thunkAPI.rejectWithValue(fieldsErrors)
    }
} )

export const logout = createAsyncThunk( 'auth/logout', async () => await authApi.logout() )

// export const getAuth_ = (): thunkType => async dispatch => {
//     try {
//
//         const { data: { data, resultCode }, status } = await authApi.me()
//         if (status === 200 && resultCode === resCodes.success) {
//             dispatch( setAuthDate( { ...data, isAuth: true } ) )
//             return true
//         }
//     } catch (e) {
//         console.log( e )
//     }
// }


export default authReducer