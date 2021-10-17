import React, {MouseEventHandler, useMemo, useState} from "react";
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


    const changeFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
        const filterValue = e.currentTarget.dataset.filter as FilterValueType
        filterValue
        && setTodoListFilter(filterValue)
    }

    const buttons = useMemo(() => ['All', 'Active', 'Completed']
        .map(m => <button key={m}
                          className={todoListFilter === m ? s.activeBtn : ''}
                          data-filter={m}
                          onClick={changeFilter}>{m}
            </button>
        ), [todoListFilter]
    )
    console.log(todoListFilter)
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
                {buttons}
            </div>
        </div>
    )
}