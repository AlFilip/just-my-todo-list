import {TasksStateType} from "../App";
import {v1} from "uuid";
import {todoListId1, todoListId2} from "./todoListReducer";

const initState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todoListId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: false}
    ]
}


const tasksReducer = (state = initState, action: TasksReducerActionTypes): TasksStateType => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    ? [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId],]
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

export type TasksReducerActionTypes = AddTaskType | RemoveTaskType | RenameTaskType | ChangeIsDoneTaskType

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


export default tasksReducer
