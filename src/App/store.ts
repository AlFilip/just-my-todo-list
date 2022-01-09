import { combineReducers } from "redux"
import { tasksReducer, todoListReducer } from "../features/TodoListsList"
import { authReducer } from '../features/Auth'
import { appReducer } from '../features/Application'
import { configureStore } from '@reduxjs/toolkit'


const rootReducer = combineReducers( {
    todo: todoListReducer,
    tasks: tasksReducer,
    auth: authReducer,
    app: appReducer,
} )

export const store = configureStore( {
    reducer: rootReducer,
} )


    export type allStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store