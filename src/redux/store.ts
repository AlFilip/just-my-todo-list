import {combineReducers, createStore} from "redux";
import todo from "../reducers/todoListReducer";
import tasks from "../reducers/tasksReducer";

const rootReducer = combineReducers({
    todo,
    tasks
})

export const store = createStore(rootReducer)

export type allStateType = ReturnType<typeof store.getState>