// export type TodoListActionTypes =
//     removeTodoListAction
//     | addTodoListAction
//     | changeTodoListTitleAction
//     | renameTodoAction
//
//
// type removeTodoListAction = ReturnType<typeof removeTodoListAC>
// export const removeTodoListAC = (todoListId: string) => ({
//     type: 'REMOVE_TODO_LIST',
//     todoListId
// } as const)
//
// type addTodoListAction = ReturnType<typeof addTodoListAC>
// export const addTodoListAC = (title: string) => ({
//     type: 'ADD_TODO_LIST',
//     title
// } as const)
//
// type changeTodoListTitleAction = ReturnType<typeof changeTodoListTitleAC>
// export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
//     type: 'CHANGE_TITLE',
//     todoListId,
//     title
// } as const)

import {todoListApi} from "../Api/Api";

export enum TODO_TYPES {
    REMOVE_TODO_LIST = 'todoList/REMOVE_TODO_LIST',
    ADD_TODO_LIST = 'todoList/ADD_TODO_LIST',
    CHANGE_TITLE = 'todoList/CHANGE_TITLE',
}
export const makeAction = <T extends TODO_TYPES, P>(type: T) => (payload: P) => ({
    type,
    payload,
})
export const renameTodoList = makeAction<TODO_TYPES.CHANGE_TITLE, { todoListId: string, title: string }>(TODO_TYPES.CHANGE_TITLE)

export const removeTodoList = makeAction<TODO_TYPES.REMOVE_TODO_LIST, { todoListId: string }>(TODO_TYPES.REMOVE_TODO_LIST)
export const addTodoListToState =makeAction<TODO_TYPES.ADD_TODO_LIST, {title: string}>(TODO_TYPES.ADD_TODO_LIST)
// export const addTodoList = (title: string) => (dispatch) => {
//     todoListApi.createTodoList(title)
//         .then(res => {
//
//         })
// }

interface IStringMap<T> {
    [key: string]: T
}

type IAnyFunction = (...args: any[]) => any
type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>

const actions = {
    removeTodoList,
    renameTodoList,
    addTodoList: addTodoListToState,
}
export type actionsTypes = IActionUnion<typeof actions>


