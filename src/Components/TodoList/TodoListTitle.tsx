import s from "./TodoList.module.css";
import React from "react";
import {EditableSpan} from "./EditableSpan";

type TodoListTitlePropsType = {
    title: string
    onChangeCallBack: (title: string) => void
    callBack: () => void
}

export const TodoListTitle: React.FC<TodoListTitlePropsType> = ({
                                                                    title,
                                                                    onChangeCallBack,
                                                                    callBack,
                                                                }) => {
    const onButtonClickHandler = () => callBack()
    return (
        <div className={s.header}>
            <EditableSpan title={title}
                          callBack={onChangeCallBack}
            />
            <button onClick={onButtonClickHandler}>x</button>
        </div>
    )
}

