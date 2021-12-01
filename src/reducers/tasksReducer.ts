import { tasksApi } from "../Api/Api"
import { thunkType } from '../redux/store'


export type taskType = {
    description: string | null
    title: string
    completed: boolean | undefined
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
        case 'TASKS/ADD_TASK':
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId], action.task],
            }
        case 'TASKS/INIT_TASKS':
            return {
                ...state,
                [action.todoListId]: action.tasks.sort( (a, b) => b.order - a.order ),
            }
        case 'TASKS/REMOVE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter( f => f.id !== action.taskId ),
            }
        case 'TASKS/UPDATE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map( m => m.id === action.task.id ? action.task : m ),
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
export const addTaskToState = (todoListId: string, task: taskType) => ( {
    type: 'TASKS/ADD_TASK',
    todoListId,
    task,
} as const )

type removeTaskFromStateActionType = ReturnType<typeof removeTaskFromState>
export const removeTaskFromState = (todoListId: string, taskId: string) => ( {
    type: 'TASKS/REMOVE_TASK',
    todoListId,
    taskId,
} as const )

type updateTaskInStateActionType = ReturnType<typeof updateTaskInState>
export const updateTaskInState = (todoListId: string, task: taskType) => ( {
    type: 'TASKS/UPDATE_TASK',
    todoListId,
    task,
} as const )

type setTasksToStateActionType = ReturnType<typeof setTasksToState>
export const setTasksToState = (todoListId: string, tasks: taskType[]) => ( {
    type: 'TASKS/INIT_TASKS',
    todoListId,
    tasks,
} as const )

export const initTasks = (todoListId: string): thunkType => async dispatch => {
    const { data: { items, error }, status } = await tasksApi.getTasks( todoListId )
    if (status === 200 && !error) {
        dispatch( setTasksToState( todoListId, items ) )
    }

}

export const createTask = (todoListId: string, title: string): thunkType => (dispatch) => {
    tasksApi.addTask( todoListId, title )
        .then( task => {
            task
            && dispatch( addTaskToState( todoListId, task ) )
        } )
}

export const deleteTask = (todoListId: string, taskId: string): thunkType => (dispatch) => {
    tasksApi.deleteTask( todoListId, taskId )
        .then( isRemoved => {
            isRemoved
            && dispatch( removeTaskFromState( todoListId, taskId ) )
        } )
}

export const updateTask = (todoListId: string, task: taskType): thunkType => (dispatch) => {
    tasksApi.updateTask( todoListId, task )
        .then( res => {
            res &&
            dispatch( updateTaskInState( todoListId, task ) )
        } )
}

export default tasksReducer
