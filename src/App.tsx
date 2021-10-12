import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./Components/TodoList/TodoList";
import {addTodoListAC, changeTodoListTitleAC, removeTodoListAC, todoListReducer} from "./reducers/todoListReducer";
import {EditableSpan} from "./Components/TodoList/EditableSpan";
import {addTaskAC, changeIsDoneAC, removeTaskAC, renameTaskAC, tasksReducer} from "./reducers/tasksReducer";


export type TaskType = { id: string, title: string, isDone: boolean }

export type TasksStateType = {
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

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    const addTodo = (title: string) => dispatchTodoList(addTodoListAC(title))

    const addTask = (todoListId: string, title: string) => dispatchTasks(addTaskAC(todoListId, title))
    const removeTask = (todoListId: string, taskId: string) => dispatchTasks(removeTaskAC(todoListId, taskId))
    const renameTask = (todoListId: string, taskId: string, newTitle: string) => dispatchTasks(renameTaskAC(todoListId, taskId, newTitle))
    const changeIsDone = (todoListId: string, taskId: string, isDone: boolean) => dispatchTasks(changeIsDoneAC(todoListId, taskId, isDone))

    const mappedTodoLists = todoLists.map(m => <TodoList key={m.id}
                                                         id={m.id}
                                                         filter={m.filter}
                                                         title={m.title}
                                                         tasks={tasks[m.id]}
                                                         removeTodo={removeTodo}
                                                         changeTodoTitle={changeTodoTitle}
                                                         addTask={addTask}
                                                         removeTask={removeTask}
                                                         renameTask={renameTask}
                                                         changeIsDone={changeIsDone}

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
