import {thunkType} from "./todoListReducer";
import {tasksApi} from "../Api/Api";

enum ACTION_TYPES {
    REMOVE_TASK = 'todoList/REMOVE_TASK',
    ADD_TASK = 'todoList/ADD_TASK',
    UPDATE_TASK = 'todoList/UPDATE_TASK',
    INIT_TASKS = 'todoList/INIT_TASKS'
}

export type taskType = {
    description: string | null
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type tasksStateType = {
    [todoListId: string]: taskType[]
}
const initState: tasksStateType = {}


const tasksReducer = (state = initState, action: allTasksReducerActionTypes): tasksStateType => {
    switch (action.type) {
        case ACTION_TYPES.ADD_TASK:
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId], action.task]
            }
        case ACTION_TYPES.INIT_TASKS:
            return {
                ...state,
                [action.todoListId]: action.tasks.sort((a, b) => b.order - a.order)
            }
        case ACTION_TYPES.REMOVE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(f => f.id !== action.taskId)
            }
        case ACTION_TYPES.UPDATE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(m => m.id === action.task.id ? action.task : m)
            }
        default:
            return state
    }
}

export type allTasksReducerActionTypes = addTaskToStateActionType
    | removeTaskFromStateActionType
    | updateTaskInStateActionType
    | setTasksToStateActionType

type addTaskToStateActionType = ReturnType<typeof addTaskToState>
export const addTaskToState = (todoListId: string, task: taskType) => ({
    type: ACTION_TYPES.ADD_TASK,
    todoListId,
    task
} as const)

type removeTaskFromStateActionType = ReturnType<typeof removeTaskFromState>
export const removeTaskFromState = (todoListId: string, taskId: string) => ({
    type: ACTION_TYPES.REMOVE_TASK,
    todoListId,
    taskId
} as const)

type updateTaskInStateActionType = ReturnType<typeof updateTaskInState>
export const updateTaskInState = (todoListId: string, task: taskType) => ({
    type: ACTION_TYPES.UPDATE_TASK,
    todoListId,
    task
} as const)

type setTasksToStateActionType = ReturnType<typeof setTasksToState>
export const setTasksToState = (todoListId: string, tasks: taskType[]) => ({
    type: ACTION_TYPES.INIT_TASKS,
    todoListId,
    tasks
} as const)

export const initTasks = (todoListId: string): thunkType => (dispatch) => {
    tasksApi.getTasks(todoListId)
        .then(tasks => {
            tasks
            && dispatch(setTasksToState(todoListId, tasks))
        })
}

export const createTask = (todoListId: string, title: string): thunkType => (dispatch) => {
    tasksApi.addTask(todoListId, title)
        .then(task => {
            task
            && dispatch(addTaskToState(todoListId, task))
        })
}

export const deleteTask = (todoListId: string, taskId: string): thunkType => (dispatch) => {
    tasksApi.deleteTask(todoListId, taskId)
        .then(isRemoved => {
            isRemoved
            && dispatch(removeTaskFromState(todoListId, taskId))
        })
}

export const updateTask = (todoListId: string, task: taskType): thunkType => (dispatch) => {
    tasksApi.updateTask(todoListId, task)
        .then(res => {
            res &&
            dispatch(updateTaskInState(todoListId, task))
        })
}

export default tasksReducer
