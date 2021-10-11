import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./Components/TodoList/TodoList";
import {changeTodoListTitleAC, removeTodoListAC, todoListReducer} from "./reducers/todoListReducer";


export type TaskType = { id: string, title: string, isDone: boolean }

type TasksStateType = {
    [todoListId: string]: TaskType[]
}

export type FilterValueType = 'All' | 'Completed' | 'Active'
export type TodoListType = { id: string, title: string, filter: FilterValueType }

function App() {
    const [todoListId1, todoListId2] = [v1(), v1()]
    let [todoLists, dispatchTodoList] = useReducer(todoListReducer, [
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    })
    const removeTodo = (todoListId: string) => dispatchTodoList(removeTodoListAC(todoListId))
    const changeTodoTitle = (todoListId: string, title: string) => {
        dispatchTodoList(changeTodoListTitleAC(todoListId, title))
    }

    const mappedTodoLists = todoLists.map(m => <TodoList key={m.id}
                                                         id={m.id}
                                                         filter={m.filter}
                                                         title={m.title}
                                                         tasks={tasks[m.id]}
                                                         removeTodo={removeTodo}
                                                         changeTodoTitle={changeTodoTitle}
    />)

    return (
        <div className="App">
            {mappedTodoLists}
        </div>
    );
}

export default App;
