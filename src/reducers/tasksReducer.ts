import {TasksStateType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: TasksStateType, action: TasksReducerActionTypes): TasksStateType => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    ? [...state[action.todoListId], {id: v1(), title: action.title, isDone: false}]
                    : [{id: v1(), title: action.title, isDone: false}]
            }
        case "REMOVE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .filter(f => f.id !== action.taskId)
            }
        case "RENAME_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(m => m.id === action.taskId
                        ? {...m, title: action.newTitle}
                        : m)
            }
        case "CHANGE_IS_DONE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(m => m.id === action.taskId
                        ? {...m, isDone: action.isDone}
                        : m)
            }
        default:
            return state

    }
}

type TasksReducerActionTypes = AddTaskType | RemoveTaskType | RenameTaskType | ChangeIsDoneTaskType


type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, title: string) => ({
    type: 'ADD_TASK',
    todoListId,
    title
} as const)

type RemoveTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListId: string, taskId: string) => ({
    type: 'REMOVE_TASK',
    todoListId,
    taskId
} as const)

type RenameTaskType = ReturnType<typeof renameTaskAC>
export const renameTaskAC = (todoListId: string, taskId: string, newTitle: string) => ({
    type: 'RENAME_TASK',
    todoListId,
    taskId,
    newTitle
} as const)

type ChangeIsDoneTaskType = ReturnType<typeof changeIsDoneAC>
export const changeIsDoneAC = (todoListId: string, taskId: string, isDone: boolean) => ({
    type: 'CHANGE_IS_DONE',
    todoListId,
    taskId,
    isDone
} as const)

