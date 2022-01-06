import { useSelector } from 'react-redux'
import { allStateType } from '../../redux/store'


export function useAppSelector<T>(selector:(state: allStateType) => T):T {
    return useSelector<allStateType, T>(selector)
}

// Auth

export const selectIsAuth = (state: allStateType) => state.auth.isAuth


// App

export const selectIsInit = (state: allStateType) => state.app.isInit
export const selectAppStatus = (state: allStateType) => state.app.status
export const selectAppError = (state: allStateType) => state.app.error

// todos

export const selectTodos = (state: allStateType) => state.todo

// tasks

export const selectTasks = (state: allStateType) => state.tasks
