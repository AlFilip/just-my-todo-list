import { authApi, LoginPayloadType, ResCodes } from '../../Api/Api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { appActions } from '../Application/'
import { handleServerApiErrors, handleServerNetworkErrors } from '../../utils/error-utils'


const initState = {
    isAuth: false,
    email: null as null | string,
    id: null as null | number,
    login: null as null | string,
}

export const slice = createSlice( {
    name: 'auth',
    initialState: initState,
    reducers: {},
    extraReducers({ addCase }) {
        addCase( getAuth.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload
            }
        } )
        addCase( logout.fulfilled, () => {
            return initState
        } )

    },
} )

const getAuth = createAsyncThunk( 'auth/getAuth', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const { data: { data, resultCode } } = await authApi.me()
        if (resultCode === ResCodes.success) {
            return { ...data, isAuth: true }
        }
    } catch (e) {
        return handleServerNetworkErrors( e, rejectWithValue )

    }
} )

const login = createAsyncThunk( 'auth/login', async (arg: LoginPayloadType, thunkAPI) => {
    try {
        const { data: { resultCode, messages: [errorMessage] } } = await authApi.login( arg )
        if (resultCode === ResCodes.success) {
            thunkAPI.dispatch( appActions.initApp() )
        }
        if (errorMessage) {
            return handleServerApiErrors( errorMessage, thunkAPI.rejectWithValue )
        }
    } catch (e) {
        return handleServerNetworkErrors( e, thunkAPI.rejectWithValue )

    }
} )


const logout = createAsyncThunk( 'auth/logout', async () => {
    await authApi.logout()
} )

export const asyncActions = {
    getAuth,
    login,
    logout,
}
