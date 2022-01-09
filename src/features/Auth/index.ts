import * as authSelectors from './selectors'
import { slice, asyncActions } from './authReducer'
import { Login } from './Login'


const authReducer = slice.reducer
const authActions = {
    ...slice.actions,
    ...asyncActions
}

export {
    authSelectors,
    authReducer,
    authActions,
    Login
}