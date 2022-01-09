import * as appSelectors  from './selectors'
import { slice, asyncActions } from './appReducer'

const actions = slice.actions
const appReducer =  slice.reducer

const appActions = {
    ...actions,
    ...asyncActions
}

export {
    appSelectors,
    appActions,
    appReducer,
}