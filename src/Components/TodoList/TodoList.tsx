import React from "react";
import s from './TodoList.module.css'
import {FilterValueType, TaskType} from "../../App";
import {TodoListTitle} from "./TodoListTitle";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValueType
    tasks: TaskType[]
    removeTodo: (todoListId: string) => void
    changeTodoTitle: (todoListId: string, title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = ({
                                                          id,
                                                          title,
                                                          filter,
                                                          tasks,
                                                          ...props
                                                      }) => {
    const removeTodo = () => props.removeTodo(id)
    const changeTodoTitle = (title: string) => props.changeTodoTitle(id, title)


    const mappedTasks = tasks.map(m => (
        <li key={m.id} id={m.id}>
            {m.title}
            <input type="checkbox" checked={m.isDone}/>
        </li>
    ))

    return (
        <div className={s.todoList}>
            <TodoListTitle title={title}
                           callBack={removeTodo}
                           onChangeCallBack={changeTodoTitle}
            />

            <div className={s.body}>
                {mappedTasks}
            </div>

            <div className={s.filters}>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}