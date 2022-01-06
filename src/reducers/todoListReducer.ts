import { domainTodoListType, resCodes, todoListApi } from "../Api/Api"
import { thunkType } from '../redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus, setError, setInit, statusType } from "./appReducer"


export type todoListType = domainTodoListType & {
    todoStatus: statusType
}
const initState: todoListType[] = []

const slice = createSlice( {
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
        addCase(updateTodoName.fulfilled, (state, action) => {
            if (action.payload){
                const {id, title} = action.payload
                const todo = state.find( f => f.id === id )
                if (todo) {
                    todo.title = title
                }
            }
        })
        addCase(getTodos.fulfilled, (state, action) => {
            if (action.payload){
                const {items} = action.payload
                return [...items]  as todoListType[]
            }
        })
    },
} )

const todoListReducer = slice.reducer
export const { updateTodoStatus } = slice.actions

export const addTodoList = createAsyncThunk( 'todo/addTodoList', async (title: string, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await todoListApi.createTodoList( title )
        if (status === 200 && resultCode === resCodes.success) {
            // dispatch( addTodoToState( { item } ) )
        }
        if (errorMessage) {
            return rejectWithValue( { error: errorMessage } )
        }
        return { item }
        // errorMessage
        // && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        return rejectWithValue( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
} )

// export const addTodoList_ = (title: string): thunkType => async dispatch => {
//     try {
//         dispatch( setAppStatus( { status: 'loading' } ) )
//         const { status, data: { data: { item }, resultCode, messages: [errorMessage] } } = await todoListApi.createTodoList( title )
//         if (status === 200 && resultCode === resCodes.success) {
//             dispatch( addTodoToState( { item } ) )
//         }
//         errorMessage
//         && dispatch( setError( { error: errorMessage } ) )
//     } catch (e) {
//         console.log( e )
//     } finally {
//         dispatch( setAppStatus( { status: 'idle' } ) )
//     }
//
// }


export const getTodos = createAsyncThunk('todo/getTodos', async (ar, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { data, status } = await todoListApi.getTodoLists()
        if (status === 200 && data.length) {
            dispatch( setInit() )
            return { items: data.map( m => ( { ...m, todoStatus: 'idle' } ) ) }
            // dispatch( setTodoListsToState( { items: data.map( m => ( { ...m, todoStatus: 'idle' } ) ) } ) )
        }
    } catch (e) {
        return rejectWithValue(e)
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
})

// export const getTodos_ = (): thunkType => async dispatch => {
//     try {
//         dispatch( setAppStatus( { status: 'loading' } ) )
//         const { data, status } = await todoListApi.getTodoLists()
//         if (status === 200 && data.length) {
//             dispatch( setTodoListsToState( { items: data.map( m => ( { ...m, todoStatus: 'idle' } ) )  } ) )
//             dispatch( setInit() )
//         }
//     } catch (e) {
//         console.log( e )
//     } finally {
//         dispatch( setAppStatus( { status: 'idle' } ) )
//     }
// }

export const removeTodoList = createAsyncThunk( 'todo/removeTodoList', async (id: string, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi
    try {
        dispatch( updateTodoStatus( { id, status: 'loading' } ) )
        dispatch( setAppStatus( { status: 'loading' } ) )
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
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
    }
} )

// export const removeTodoList_ = (id: string): thunkType => async dispatch => {
//     try {
//         dispatch( updateTodoStatus( { id, status: 'loading' } ) )
//         dispatch( setAppStatus( { status: 'loading' } ) )
//         const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.removeTodoList( id )
//         if (status === 200 && resultCode === resCodes.success) {
//             dispatch( removeTodoFromState( { id } ) )
//         }
//         errorMessage
//         && dispatch( setError( { error: errorMessage } ) )
//     } catch (e) {
//         console.log( e )
//     } finally {
//         dispatch( setAppStatus( { status: 'idle' } ) )
//     }
// }

export const updateTodoName = createAsyncThunk( 'todo/updateTodo', async (arg: { id: string, title: string }, thunkAPI) => {
    const { title, id } = arg
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch( updateTodoStatus( { id: id, status: 'loading' } ) )
        dispatch( setAppStatus( { status: 'loading' } ) )
        const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.updateTodoTitle( id, title )
        if (status === 200 && resultCode === resCodes.success) {
            return { id, title }
            // dispatch( renameTodoInState( { id, title } ) )
        }
        if (errorMessage) {
             return rejectWithValue({ error: errorMessage })
        }
        // errorMessage
        // && dispatch( setError( { error: errorMessage } ) )
    } catch (e) {
        console.log( e )
    } finally {
        dispatch( setAppStatus( { status: 'idle' } ) )
        dispatch( updateTodoStatus( { id: id, status: 'idle' } ) )
    }
} )

// export const updateTodo = (id: string, title: string): thunkType => async dispatch => {
//     try {
//         dispatch( updateTodoStatus( { id: id, status: 'loading' } ) )
//         dispatch( setAppStatus( { status: 'loading' } ) )
//         const { status, data: { resultCode, messages: [errorMessage] } } = await todoListApi.updateTodoTitle( id, title )
//         if (status === 200 && resultCode === resCodes.success) {
//             dispatch( renameTodoInState( { id, title } ) )
//         }
//         errorMessage
//         && dispatch( setError( { error: errorMessage } ) )
//     } catch (e) {
//         console.log( e )
//     } finally {
//         dispatch( setAppStatus( { status: 'idle' } ) )
//         dispatch( updateTodoStatus( { id: id, status: 'idle' } ) )
//     }
// }

export default todoListReducer