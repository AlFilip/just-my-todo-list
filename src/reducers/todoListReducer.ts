import {TodoListType} from "../App";
import {v1} from "uuid";
import {actionsTypes, TODO_TYPES} from "../actions/todoListActions";

export const [todoListId1, todoListId2] = [v1(), v1()]

const initState: Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "All"},
    {id: todoListId2, title: "What to buy", filter: "All"}
]

const todoListReducer = (state = initState, action: actionsTypes): Array<TodoListType> => {
    switch (action.type) {
        case TODO_TYPES.ADD_TODO_LIST:
            return [...state, {id: v1(), title: action.payload.title, filter: "All"}]
        case TODO_TYPES.REMOVE_TODO_LIST:
            return state.filter(f => f.id !== action.payload.todoListId)
        case TODO_TYPES.CHANGE_TITLE:
            const {todoListId, title} = action.payload
            return state.map(m => m.id === todoListId ? {...m, title} : m)
        default:
            return state
    }
}

export default todoListReducer