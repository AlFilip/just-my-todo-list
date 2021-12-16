import { thunkType } from '../redux/store'
import { authApi, resCodes } from '../Api/Api'
import { createSlice } from '@reduxjs/toolkit'


const initState = {
    isAuth: false,
    email: null,
    id: null,
    login: null,
}

const slice = createSlice( {
    name: 'auth',
    initialState: initState,
    reducers: {
        setAuthDate(state, action) {
            state = action.payload
        },
    },
} )

const authReducer = slice.reducer

const { setAuthDate } = slice.actions


export const initAuthData = (): thunkType => async dispatch => {
    try {
        const { data: { data, resultCode }, status } = await authApi.me()
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( setAuthDate( { ...data, isAuth: true } ) )
            return true
        }
    } catch (e) {
        console.log( e )
    }
}


export default authReducer