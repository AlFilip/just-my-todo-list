import s from "./TodoList.module.css";
import React from "react";

type TodoListTitlePropsType = {
    title: string
    callBack: () => void
}

export const TodoListTitle: React.FC<TodoListTitlePropsType> = ({
                                                                    title,
                                                                    callBack,
                                                                }) => {
    const onButtonClickHandler = () => callBack()
    return (
        <div className={s.header}>
            {title}
            <button onClick={onButtonClickHandler}>x</button>
        </div>
    )
}