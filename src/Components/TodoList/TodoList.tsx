import React, {MouseEventHandler, useState} from "react";
import s from './TodoList.module.css'
import {FilterValueType, TaskType} from "../../App";
import {TodoListTitle} from "./TodoListTitle";
import {Tasks} from "./Tasks/Tasks";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValueType
    tasks: TaskType[]
    removeTodo: (todoListId: string) => void
    changeTodoTitle: (todoListId: string, title: string) => void
    addTask: (todoListId: string, title: string) => void
    removeTask: (todoListId: string, taskId: string) => void
    renameTask: (todoListId: string, taskId: string, newTitle: string) => void
    changeIsDone: (todoListId: string, taskId: string, isDone: boolean) => void
}

export const TodoList: React.FC<TodoListPropsType> = ({
                                                          id,
                                                          title,
                                                          filter,
                                                          tasks,
                                                          ...props
                                                      }) => {
    const [todoListFilter, setTodoListFilter] = useState(filter)
    const getFilteredTasks = () => {
        switch (todoListFilter) {
            case "All":
                return tasks
            case "Active":
                return tasks.filter(f => !f.isDone)
            case "Completed":
                return tasks.filter(f => f.isDone)
        }
    }
    const removeTodo = () => props.removeTodo(id)
    const changeTodoTitle = (title: string) => props.changeTodoTitle(id, title)

    const addTask = (title: string) => props.addTask(id, title)
    const removeTask = (taskId: string) => props.removeTask(id, taskId)
    const renameTask = (taskId: string, title: string,) => props.renameTask(id, taskId, title)
    const changeIsDone = (taskId: string, isDone: boolean) => props.changeIsDone(id, taskId, isDone)

    const setFilterAll = () => setTodoListFilter('All')
    const setFilterActive = () => setTodoListFilter('Active')
    const setFilterCompleted = () => setTodoListFilter('Completed')

    // const changeFilter:MouseEventHandler<HTMLButtonElement> = (e) => {
    //     console.log(e.currentTarget.innerHTML)
    //     const value = e.currentTarget.innerHTML
    //     value && (value in FilterValueType) && setTodoListFilter(value)
    // }
    // const filtersArr: FilterValueType[] = ['All' , 'Completed' , 'Active']
    // const buttons = filtersArr.map(m => <button onClick={changeFilter}>{m}</button>)
    return (
        <div className={s.todoList}>
            <TodoListTitle title={title}
                           callBack={removeTodo}
                           onChangeCallBack={changeTodoTitle}
                           addTask={addTask}
            />
            <Tasks tasks={getFilteredTasks()}
                   renameTask={renameTask}
                   changeIsDone={changeIsDone}
                   removeTask={removeTask}
            />

            <div className={s.filters}>
                {/*{buttons}*/}
                <button className={todoListFilter === 'All' ? s.activeBtn : ''} onClick={setFilterAll}>All</button>
                <button className={todoListFilter === 'Active' ? s.activeBtn : ''} onClick={setFilterActive}>Active</button>
                <button className={todoListFilter === 'Completed' ? s.activeBtn : ''} onClick={setFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}