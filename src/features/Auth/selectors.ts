import { allStateType } from '../../App/store'


export const selectIsAuth = (state: allStateType) => state.auth.isAuth
export const selectUserName = (state: allStateType) => state.auth.login