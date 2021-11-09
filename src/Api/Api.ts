import axios from "axios";
import {todoListType} from "../reducers/todoListReducer";
import {taskType} from "../reducers/tasksReducer";

const config = {
    withCredentials: true,
    headers: {
        'API-KEY': '8ac432b4-b12d-401e-8457-1e2c87c081fe'
    }
}

const axiosTodoReq = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    ...config
})

const axiosAuthReq = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
    ...config
})

export type resDataType = {
    "id": number
    "login": string
    "email": string
}

type authResType = {
    data: resDataType
    messages: any[]
    fieldsErrors: any[]
    resultCode: number
}

export const authApi = {
    me: () => {
        return axiosAuthReq.get<authResType>('me')
            .then(res => {
                if (res.status === 200) {
                    const {data, resultCode} = res.data
                    return resultCode === 0 && data
                }
            })
            .catch(console.log)
    }
}

type todoData = {
    item: {
        id: string
        title: string
        addedDate: string
        order: number
    }
}
type postTodoData = {
    data: todoData
    messages: any[]
    fieldsErrors: any[]
    resultCode: number
}

type delTodoType = {
    resultCode: number
}


export const todoListApi = {
    getTodoLists: async () => {
        const response = await axiosTodoReq.get<todoListType[]>('')
        const {data, status} = response
        if (status === 200) {
            return data
        }
    },
    // createTodoList: (title: string) => {
    //     return axiosTodoReq.post<postTodoType>('todo-lists', {
    //         title
    //     })
    //         .then(res => res.data)
    //         .catch(console.log)
    // },
    createTodoList: async (title: string) => {
        const {status, data, data: {resultCode, messages}} = await axiosTodoReq.post<postTodoData>('', {title})
        if (status === 200 && resultCode === 0) {
            return data.data.item
        }
        alert(messages[0])
    },
    removeTodoList: async (id: string) => {
        const response = await axiosTodoReq.delete<delTodoType>(`${id}`)
        if (response.status === 200) {
            return true
        }
    }
}


type getTasksResponseType = {
    items: taskType[]
    totalCount: number
    error: null | string
}
type postTaskType = {
    data: { item: taskType }
    messages: any[]
    resultCode: number
}
type deleteTaskType = {
    status: number
    resultCode: number
    messages: any[]
}

export const tasksApi = {
    getTasks: async (todoListId: string) => {
        const {data, status} = await axiosTodoReq.get<getTasksResponseType>(`/${todoListId}/tasks`)
        const {items, error} = data
        if (status === 200 && !error) {
            return items
        }
        console.log(error)
    },
    addTask: async (todoListId: string, title: string) => {
        const {status, data: {data: {item}, resultCode, messages}} = await axiosTodoReq.post<postTaskType>(`${todoListId}/tasks`, {title})
        if (status === 200 && resultCode === 0) {
            return item
        }
        alert(messages[0])
    },
    deleteTask: async (todoListId: string, taskId: string) => {
        const {status, data:  {resultCode, messages}} = await axiosTodoReq.delete<deleteTaskType>(`${todoListId}/tasks/${taskId}`)
        return status === 200 && resultCode === 0
        console.log(messages[0]);
    },
    updateTask: async (todoListId:string, task:taskType) => {
        const req = await axiosTodoReq.put(`${todoListId}/tasks/${task.id}`, {task})
        debugger
    }
}





























