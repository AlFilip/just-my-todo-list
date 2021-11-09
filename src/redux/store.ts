import {applyMiddleware, combineReducers, createStore} from "redux";
import todo from "../reducers/todoListReducer";
import tasks from "../reducers/tasksReducer";
import auth from "../reducers/authReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todo,
    tasks,
    auth
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type allStateType = ReturnType<typeof store.getState>

//@ts-ignore
window.store = store