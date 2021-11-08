import {combineReducers, createStore} from "redux";
import todo from "../reducers/todoListReducer";
import tasks from "../reducers/tasksReducer";
import auth from "../reducers/authReducer";

const rootReducer = combineReducers({
    todo,
    tasks,
    auth
})

export const store = createStore(rootReducer)

export type allStateType = ReturnType<typeof store.getState>

//@ts-ignore
window.store = store