import axios from "axios"
import { TaskType } from "../features/TodoListsList/tasksReducer"


export enum ResCodes {
    success = 0,
    error = 1,
}

const config = {
    withCredentials: true,
    headers: {
        'API-KEY': '8ac432b4-b12d-401e-8457-1e2c87c081fe',
    },
}

const axiosTodoReq = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    ...config,
} )

const axiosAuthReq = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
    ...config,
} )


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export type CommonResponseType<T = {}> = {
    data: T
    status: TaskStatuses
    resultCode: ResCodes
    messages: string[]
    fieldsErrors: any[]
}

export type AuthMeDataType = {
    "id": number
    "login": string
    "email": string
}

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

type LoginResponseType = {
    "data": {
        "userId": number
    },
    "messages": string[],
    "fieldsErrors": string[],
    "resultCode": ResCodes
}

export const authApi = {
    me: () => axiosAuthReq.get<CommonResponseType<AuthMeDataType>>( 'me' ),
    login(payload: LoginPayloadType) {
        return axiosAuthReq.post<LoginResponseType>( 'login', payload )
    },
    logout() {
        return axiosAuthReq.delete( 'login' )
    },
}

export type DomainTodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TodoDataType = {
    item: {
        id: string
        title: string
        addedDate: string
        order: number
    }
}

export const todoListApi = {
    getTodoLists: () => axiosTodoReq.get<DomainTodoListType[]>( '' ),

    createTodoList: (title: string) => {
        return axiosTodoReq.post<CommonResponseType<TodoDataType>>( '', { title } )
    },

    removeTodoList: (id: string) => {
        return axiosTodoReq.delete<CommonResponseType>( `${ id }` )
    },
    updateTodoTitle: (todoListId: string, title: string) => {
        return axiosTodoReq.put<CommonResponseType>( `${ todoListId }`, { title } )
    },
}


export type DomainTaskType = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    items: DomainTaskType[]
    totalCount: number
    error: null | string
    fieldsErrors: any[]
}

export const tasksApi = {
    getTasks: (todoListId: string) => {
        return axiosTodoReq.get<GetTasksResponseType>( `/${ todoListId }/tasks` )
    },
    addTask: (todoListId: string, title: string) => {
        return axiosTodoReq.post<CommonResponseType<{ item: DomainTaskType }>>( `${ todoListId }/tasks`, { title } )
    },
    deleteTask: (todoListId: string, taskId: string) => {
        return axiosTodoReq.delete<CommonResponseType>( `${ todoListId }/tasks/${ taskId }` )
    },
    updateTask: (todoListId: string, task: TaskType) => {
        return axiosTodoReq.put<CommonResponseType>( `${ todoListId }/tasks/${ task.id }`, task )

    },
}

