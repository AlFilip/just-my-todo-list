import { thunkType } from '../redux/store'
import { initAuthData } from './authReducer'
import { getTodos } from './todoListReducer'


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

export const initApp = (): thunkType => async dispatch => {
    const isAuthCompleted = await dispatch( initAuthData() )
    isAuthCompleted && dispatch( getTodos() )
}

export default appReducer


















