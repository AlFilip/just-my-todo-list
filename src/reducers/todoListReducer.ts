import {TodoListType} from "../App";

export const todoListReducer = (state: Array<TodoListType>, action: TodoListActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE_TODO_LIST":
            return state.filter(f => f.id !== action.todoListId)
        case "CHANGE_TITLE":
            return state.map(m => m.id === action.todoListId ? {...m, title: action.title} : m)
        default:
            return state

    }
}

type TodoListActionTypes = removeTodoListAction | addTodoListAction | changeTodoListTitleAction

type removeTodoListAction = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => ({
    type: 'REMOVE_TODO_LIST',
    todoListId
} as const)

type addTodoListAction = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => ({
    type: 'ADD_TODO_LIST',
    title
} as const)

type changeTodoListTitleAction = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
    type: 'CHANGE_TITLE',
    todoListId,
    title
} as const)