import axios from "axios"
import { todoListType } from "../reducers/todoListReducer"
import { taskType } from "../reducers/tasksReducer"


export enum resultCodes {
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


type commonResponseType<T = {}> = {
    data: T
    status: number
    resultCode: number
    messages: string[]
    fieldsErrors: any[]
}

export type authMeDataType = {
    "id": number
    "login": string
    "email": string
}

export const authApi = {
    me: () => axiosAuthReq.get<commonResponseType<authMeDataType>>( 'me' ),

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
    getTodoLists: () => axiosTodoReq.get<todoListType[]>( '' ),

    createTodoList: async (title: string) => {
        const { status, data, data: { resultCode, messages } } = await
            axiosTodoReq.post<commonResponseType<todoDataType>>( '', { title } )
        if (status === 200 && resultCode === 0) {
            return data.data.item
        }
        alert( messages[0] )
    },
    removeTodoList: async (id: string) => {
        const response = await axiosTodoReq.delete<commonResponseType>( `${ id }` )

        if (response.status === 200) {
            return true
        }
    },
    updateTodoTitle: async (todoListId: string, title: string) => {
        const { status, data: { resultCode } } = await
            axiosTodoReq.put<commonResponseType>( `${ todoListId }`, { title } )

        return status === 200 && resultCode === 0
    },
}


type getTasksResponseType = {
    items: taskType[]
    totalCount: number
    error: null | string
    fieldsErrors: any[]
}

export const tasksApi = {
    getTasks: async (todoListId: string) => {
        const { data, status } = await axiosTodoReq.get<getTasksResponseType>( `/${ todoListId }/tasks` )

        const { items, error } = data
        if (status === 200 && !error) {
            return items
        }
        console.log( error )
    },
    addTask: async (todoListId: string, title: string) => {
        const { status, data: { data: { item }, resultCode, messages } } = await
            axiosTodoReq.post<commonResponseType<{ item: taskType }>>( `${ todoListId }/tasks`, { title } )

        if (status === 200 && resultCode === 0) {
            return item
        }
        alert( messages[0] )
    },
    deleteTask: async (todoListId: string, taskId: string) => {
        const { status, data: { resultCode, messages } } = await
            axiosTodoReq.delete<commonResponseType>( `${ todoListId }/tasks/${ taskId }` )

        if (status === 200 && resultCode === 0) {
            return true
        }
        alert( messages[0] )
    },
    updateTask: async (todoListId: string, task: taskType) => {
        const { status, data: { resultCode, messages } } = await
            axiosTodoReq.put<commonResponseType>( `${ todoListId }/tasks/${ task.id }`, task )
        if (status === 200 && resultCode === 0) {
            return true
        }
        alert( messages[0] )
    },
}





























