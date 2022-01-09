import { domainTodoListType, resCodes, todoListApi } from "../../Api/Api"
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authActions } from '../Auth'
import { tasksActions} from './'
import { statusType } from '../Application/appReducer'


export type todoListType = domainTodoListType & {
    todoStatus: statusType
}
const initState: todoListType[] = []

export const slice = createSlice( {
    name: 'todo',
    initialState: initState,
    reducers: {
        updateTodoStatus(state, { payload: { id, status } }: PayloadAction<{ id: string, status: statusType }>) {
            return state.map( m => m.id === id ? { ...m, todoStatus: status } : m )
        },
    },
    extraReducers: ({ addCase }) => {
        addCase( addTodoList.fulfilled, (state, action) => {
            if (action.payload) {
                const { item } = action.payload
                state.unshift( { ...item, todoStatus: 'idle' } )
            }
        } )
        addCase( removeTodoList.fulfilled, (state, action) => {
            if (action.payload) {
                const { id } = action.payload
                const index = state.findIndex( f => f.id === id )
                state.splice( index, 1 )
            }
        } )

        addCase( updateTodoName.pending, (state, action) => {
            const { id } = action.meta.arg
            const todo = state.find( f => f.id === id )
            if (todo) {
                todo.todoStatus = 'loading'
            }
        } )
        addCase( updateTodoName.fulfilled, (state, action) => {
            if (action.payload) {
                const { id, title } = action.payload
                const todo = state.find( f => f.id === id )
                if (todo) {
                    todo.title = title
                    todo.todoStatus = 'idle'
                }
            }
        } )
        addCase( getTodos.fulfilled, (state, action) => {
            if (action.payload) {
                const { items } = action.payload
                return [...items] as todoListType[]
            }
        } )
        addCase( authActions.logout.fulfilled, () => {
            return []
        } )
    },
} )

const { updateTodoStatus } = slice.actions

const addTodoList = createAsyncThunk( 'todo/addTodoList', async (title: string, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await todoListApi.createTodoList( title )
        if (status === 200 && resultCode === resCodes.success) {
            // dispatch( addTodoToState( { item } ) )
        }
        if (errorMessage) {
            return rejectWithValue( { error: errorMessage } )
        }
        return { item }
    } catch (e) {
        return rejectWithValue( e )
    }
} )

const getTodos = createAsyncThunk( 'todo/getTodos', async (ar, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        const { data } = await todoListApi.getTodoLists()
        const promises = data.map( m => dispatch( tasksActions.fetchTasks( m.id ) ) )
        await Promise.all( promises )
        return { items: data.map( m => ( { ...m, todoStatus: 'idle' } ) ) }
        // dispatch( setTodoListsToState( { items: data.map( m => ( { ...m, todoStatus: 'idle' } ) ) } ) )

    } catch (e) {
        return rejectWithValue( e )
    }
} )

const removeTodoList = createAsyncThunk( 'todo/removeTodoList', async (id: string, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi
    try {
        dispatch( updateTodoStatus( { id, status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.removeTodoList( id )
        if (status === 200 && resultCode === resCodes.success) {
            return { id }
            // dispatch( removeTodoFromState( { id } ) )
        }
        if (errorMessage) {
            return rejectWithValue( { error: errorMessage } )
        }
        // errorMessage
        // && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        return rejectWithValue( e )
    }
} )

const updateTodoName = createAsyncThunk( 'todo/updateTodo', async (arg: { id: string, title: string }, thunkAPI) => {
    const { title, id } = arg
    const { rejectWithValue } = thunkAPI
    try {
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.updateTodoTitle( id, title )
        if (status === 200 && resultCode === resCodes.success) {
            return { id, title }
        }
        if (errorMessage) {
            return rejectWithValue( { error: errorMessage } )
        }
    } catch (e) {
        console.log( e )
    }
} )

export const asyncActions = {
    addTodoList,
    getTodos,
    removeTodoList,
    updateTodoName,
}
