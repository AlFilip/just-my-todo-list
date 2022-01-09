import * as authSelectors from './selectors'
import { slice, asyncActions } from './authReducer'


const authReducer = slice.reducer
const authActions = {
    ...slice.actions,
    ...asyncActions
}

export {
    authSelectors,
    authReducer,
    authActions
}