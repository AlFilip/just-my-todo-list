import { AnyAction, combineReducers } from "redux"
import todo from "../reducers/todoListReducer"
import tasks from "../reducers/tasksReducer"
import auth from "../reducers/authReducer"
import { ThunkAction } from "redux-thunk"
import app from '../reducers/appReducer'
import { configureStore } from '@reduxjs/toolkit'


const rootReducer = combineReducers( {
    todo,
    tasks,
    auth,
    app,
} )

export const store = configureStore( {
    reducer: rootReducer,
} )


export type allStateType = ReturnType<typeof rootReducer>

export type thunkType = ThunkAction<any, allStateType, any, AnyAction>


//@ts-ignore
window.store = store