import { thunkType } from '../redux/store'
import { authApi, resultCodes } from '../Api/Api'
import { initAuthData, setAuthDataToState } from './authReducer'


const initState = {
    isInit: false,
}
type appStateType = typeof initState

const appReducer = (state = initState, action: appActionTypes): appStateType => {
    switch (action.type) {
        case 'SET_INIT':
            return {
                ...state, isInit: true,
            }
        default:
            return state
    }
}

export type appActionTypes = setIsInitActionType

type setIsInitActionType = ReturnType<typeof setIsInit>
const setIsInit = () => ( {
    type: 'SET_INIT',
} as const )

const initApp = (): thunkType => async dispatch => {
    dispatch(initAuthData())
}

export default appReducer