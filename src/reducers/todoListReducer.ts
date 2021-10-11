import {TodoListType} from "../App";

export const todoListReducer = (state: Array<TodoListType>, action: TodoListActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE_TODO_LIST":
            return state.filter(f => f.id !== action.todoListId)

        default:
            return state

    }
}

type TodoListActionTypes = removeTodoListAction | addTodoListAction

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