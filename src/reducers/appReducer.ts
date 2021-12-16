import { thunkType } from '../redux/store'
import { initAuthData } from './authReducer'
import { getTodos } from './todoListReducer'
import { createSlice } from '@reduxjs/toolkit'


const initState = {
    isInit: false,
}

const slice = createSlice( {
    name: 'app',
    initialState: initState,
    reducers: {
        setInit(state) {
            state.isInit = true
        },
    },
} )

const appReducer = slice.reducer
export const { setInit } = slice.actions


export const initApp = (): thunkType => async dispatch => {
    const isAuthCompleted = await dispatch( initAuthData() )
    isAuthCompleted && dispatch( getTodos() )
}

export default appReducer


















