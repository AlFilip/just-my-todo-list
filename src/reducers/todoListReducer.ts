import {todoListApi} from "../Api/Api";
import {ThunkAction} from "redux-thunk";
import {allStateType} from "../redux/store";
import {allTasksReducerActionTypes} from "./tasksReducer";

export type thunkType = ThunkAction<any, allStateType, any, allActionTypes>

type allActionTypes = allTodoListReducerActionTypes | allTasksReducerActionTypes

enum ACTION_TYPES {
    REMOVE_TODO_LIST = 'todoList/REMOVE_TODO_LIST',
    ADD_TODO_LIST = 'todoList/ADD_TODO_LIST',
    CHANGE_TODO_TITLE = 'todoList/CHANGE_TITLE',
    INIT_TODO = 'todoList/INIT_TODO'
}

export type todoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
const initState: todoListType[] = []

const todoListReducer = (state = initState, action: allTodoListReducerActionTypes): Array<todoListType> => {
    switch (action.type) {
        case ACTION_TYPES.ADD_TODO_LIST:
            return [...state, action.todo]
        case ACTION_TYPES.REMOVE_TODO_LIST:
            return state.filter(f => f.id !== action.id)
        case ACTION_TYPES.CHANGE_TODO_TITLE:
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case ACTION_TYPES.INIT_TODO:
            return action.items.sort((a, b) => b.order - a.order)
        default:
            return state
    }
}
type allTodoListReducerActionTypes = addTodoToStateActionType
    | removeTodoFromStateActionType
    | renameTodoInStateActionType
    | InitTodoListStateActionType


export const addTodoToState = (todo: todoListType) => ({
    type: ACTION_TYPES.ADD_TODO_LIST, todo
} as const)
type addTodoToStateActionType = ReturnType<typeof addTodoToState>

export const removeTodoFromState = (id: string) => ({
    type: ACTION_TYPES.REMOVE_TODO_LIST,
    id
} as const)

type removeTodoFromStateActionType = ReturnType<typeof removeTodoFromState>

export const renameTodoInState = (id: string, title: string) => ({
    type: ACTION_TYPES.CHANGE_TODO_TITLE,
    id, title
} as const)

type renameTodoInStateActionType = ReturnType<typeof renameTodoInState>

export const setTodoListsToState = (items: todoListType[]) => ({
    type: ACTION_TYPES.INIT_TODO,
    items
} as const)
type InitTodoListStateActionType = ReturnType<typeof setTodoListsToState>

export const addTodoList = (title: string): thunkType => (dispatch) => {
    todoListApi.createTodoList(title)
        .then(todoList => {
            todoList
            && dispatch(addTodoToState(todoList))
        })
}

export const initTodoLists = (): thunkType => (dispatch) => {
    todoListApi.getTodoLists()
        .then(items => {
            items
            && dispatch(setTodoListsToState(items))
        })
        .catch(console.log)
}

export const removeTodoList = (id: string): thunkType => (dispatch) => {
    todoListApi.removeTodoList(id)
        .then(res => {
            if (res) {
                dispatch(removeTodoFromState(id))
            }
        })
}

export const updateTodoTitle = (todoListId: string, title: string):thunkType => (dispatch) => {
    todoListApi.updateTodoTitle(todoListId, title)
        .then(success => {
            success
            && dispatch(renameTodoInState(todoListId, title))
        })
}

export default todoListReducer