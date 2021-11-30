import { thunkType } from '../redux/store'
import { authApi, resultCodes } from '../Api/Api'


export type authStateType =  {
    isAuth: boolean
    email: string | null
    id: number | null
    login: string | null
}

const initState: authStateType = {
    isAuth: false,
    email: null,
    id: null,
    login: null,
}

const authReducer = (state=initState, action: authActionTypes): authStateType => {
    switch (action.type) {
        case "SET_AUTH_DATA":
            return {
                ...state, ...action.payload
            }
        default: return state
    }
}


export type authActionTypes = setAuthDataAction
type setAuthDataAction = ReturnType<typeof setAuthDataToState>

export const setAuthDataToState = (payload: authStateType) => ({
    type: 'SET_AUTH_DATA', payload
} as const)

export const initAuthData = ():thunkType => async dispatch => {
    const { data: { data, resultCode, messages }, status } = await authApi.me()
    if (status === 200 && resultCode === resultCodes.success) {
        dispatch( setAuthDataToState( { ...data, isAuth: true } ) )
    }
}







export default authReducer