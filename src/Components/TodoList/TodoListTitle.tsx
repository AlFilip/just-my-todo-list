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
        <>
            <div className={s.btnDiv}>
                <button className={s.deleteBtn} onClick={onButtonClickHandler}>x</button>
            </div>
            <div className={s.title}>
                <EditableSpan title={title}
                              callBack={onChangeCallBack}
                />
            </div>
        </>
    )
}

