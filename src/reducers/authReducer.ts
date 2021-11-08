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


type authActionTypes = setAuthDataAction
type setAuthDataAction = ReturnType<typeof setAuthData>

export const setAuthData = (payload: authStateType) => ({
    type: 'SET_AUTH_DATA', payload
} as const)





export default authReducer