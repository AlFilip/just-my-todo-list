import { allStateType } from '../../App/store'


export const selectIsInit = (state: allStateType) => state.app.isInit
export const selectAppStatus = (state: allStateType) => state.app.status
export const selectAppError = (state: allStateType) => state.app.error