import { thunkType } from '../redux/store'
import { authApi, resCodes } from '../Api/Api'


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
    try {
        const { data: { data, resultCode, messages }, status } = await authApi.me()
        if (status === 200 && resultCode === resCodes.success) {
            dispatch( setAuthDataToState( { ...data, isAuth: true } ) )
            return true
        }
    }catch (e) {
        console.log(e)
    }
}







export default authReducer