import { authApi, resCodes } from '../Api/Api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


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
    extraReducers( {addCase } ){
        addCase( getAuth.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload
            }
        })
    }
} )

const authReducer = slice.reducer

export const getAuth = createAsyncThunk('auth/getAuth', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
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
})

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