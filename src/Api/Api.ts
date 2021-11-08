import {todoListId1, todoListId2} from "../reducers/todoListReducer";
import {TodoListType} from "../App";
import axios, {AxiosResponse} from "axios";

const todoLists: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "All"},
    {id: todoListId2, title: "What to buy", filter: "All"}
]

const axiosReq = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8ac432b4-b12d-401e-8457-1e2c87c081fe'
    }
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
        return axiosReq.get<authResType>('auth/me')
            .then(res => {
                if (res.status === 200) {
                    const {data, resultCode} = res.data
                    return resultCode === 0 && data
                }
            })
            .catch(console.log)
    }
}

export const todoListApi = {
    getTodoLists: () => {
        return new Promise<Array<TodoListType>>((res, rej) => {
            setTimeout(() => {
                res(todoLists)
            }, 200)
        })
    },
}