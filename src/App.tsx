import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList/TodoList";
import {EditableSpan} from "./Components/TodoList/EditableSpan";
import {actionsTypes, addTodoList} from "./actions/todoListActions";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {allStateType} from "./redux/store";


export type TaskType = { id: string, title: string, isDone: boolean }

export type TasksStateType = {
    [todoListId: string]: TaskType[]
}

export type FilterValueType = 'All' | 'Completed' | 'Active'
export type TodoListType = { id: string, title: string, filter: FilterValueType }

function App() {
    const dispatch = useDispatch<Dispatch<actionsTypes>>()
    const todoLists = useSelector<allStateType, Array<TodoListType>>(state => state.todo)

    const addTodo = useCallback((title: string) => {
        dispatch(addTodoList({title}))
    }, [dispatch])

    const mappedTodoLists = todoLists.map(m => <TodoList key={m.id}
                                                         todoListId={m.id}
                                                         filter={m.filter}
                                                         title={m.title}

    />)

    return (
        <div className="App">
            <EditableSpan title={''} callBack={addTodo} buttonTitle={'Add'}>
                +
            </EditableSpan>
            {mappedTodoLists}
        </div>
    );
}

export default App;
