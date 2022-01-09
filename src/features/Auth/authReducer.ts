import { authApi, loginPayloadType, resCodes } from '../../Api/Api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { appActions } from '../Application/'


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
    const {  rejectWithValue } = thunkAPI
    try {
        const { data: { data, resultCode } } = await authApi.me()
        if (resultCode === resCodes.success) {
            return { ...data, isAuth: true }
        }
    } catch (e) {
        return rejectWithValue( e )
    }
} )

const login = createAsyncThunk( 'auth/login', async (arg: loginPayloadType, thunkAPI) => {
    const { data: { fieldsErrors, resultCode } } = await authApi.login( arg )
    if (resultCode === resCodes.success) {
        thunkAPI.dispatch( appActions.initApp() )
    }
    if (fieldsErrors.length) {
        thunkAPI.rejectWithValue(fieldsErrors)
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
