import {applyMiddleware, combineReducers, createStore} from "redux";
import todo, { allTodoListReducerActionTypes } from "../reducers/todoListReducer"
import tasks, { allTasksReducerActionTypes } from "../reducers/tasksReducer"
import auth from "../reducers/authReducer";
import thunk, { ThunkAction } from "redux-thunk"


const rootReducer = combineReducers({
    todo,
    tasks,
    auth
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type allStateType = ReturnType<typeof store.getState>

export type thunkType = ThunkAction<any, allStateType, any, allActionTypes>

export type allActionTypes = allTodoListReducerActionTypes | allTasksReducerActionTypes

//@ts-ignore
window.store = store