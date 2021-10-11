import React from "react";
import s from './TodoList.module.css'



export const TodoList = () => {
    return (
        <div className={s.todoList}>
            <div className={s.header}>
                Header
            </div>
            <div className={s.body}>
                body
            </div>
            <div className={s.filters}>
                buttons
            </div>
        </div>
    )
}