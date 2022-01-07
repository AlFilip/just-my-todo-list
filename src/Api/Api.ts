import axios from "axios"
import { taskType } from "../reducers/tasksReducer"


export enum resCodes {
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

type commonResponseType<T = {}> = {
    data: T
    status: TaskStatuses
    resultCode: number
    messages: string[]
    fieldsErrors: any[]
}

export type authMeDataType = {
    "id": number
    "login": string
    "email": string
}

export type loginPayloadType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

type loginResponseType = {
    "data": {
        "userId": number
    },
    "messages": string[],
    "fieldsErrors": [],
    "resultCode": resCodes
}

export const authApi = {
    me: () => axiosAuthReq.get<commonResponseType<authMeDataType>>( 'me' ),
    login(payload: loginPayloadType) {
        return axiosAuthReq.post<loginResponseType>( 'login', payload )
    },
    logout() {
        return axiosAuthReq.delete( 'login' )
    },
}

export type domainTodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type todoDataType = {
    item: {
        id: string
        title: string
        addedDate: string
        order: number
    }
}

export const todoListApi = {
    getTodoLists: () => axiosTodoReq.get<domainTodoListType[]>( '' ),

    createTodoList: (title: string) => {
        return axiosTodoReq.post<commonResponseType<todoDataType>>( '', { title } )
    },

    removeTodoList: (id: string) => {
        return axiosTodoReq.delete<commonResponseType>( `${ id }` )
    },
    updateTodoTitle: (todoListId: string, title: string) => {
        return axiosTodoReq.put<commonResponseType>( `${ todoListId }`, { title } )
    },
}


type getTasksResponseType = {
    items: taskType[]
    totalCount: number
    error: null | string
    fieldsErrors: any[]
}

export const tasksApi = {
    getTasks: (todoListId: string) => {
        return axiosTodoReq.get<getTasksResponseType>( `/${ todoListId }/tasks` )
    },
    addTask: (todoListId: string, title: string) => {
        return axiosTodoReq.post<commonResponseType<{ item: taskType }>>( `${ todoListId }/tasks`, { title } )
    },
    deleteTask: (todoListId: string, taskId: string) => {
        return axiosTodoReq.delete<commonResponseType>( `${ todoListId }/tasks/${ taskId }` )
    },
    updateTask: (todoListId: string, task: taskType) => {
        return axiosTodoReq.put<commonResponseType>( `${ todoListId }/tasks/${ task.id }`, task )

    },
}





























