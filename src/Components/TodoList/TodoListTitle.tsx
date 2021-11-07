import s from "./TodoListTitle.module.css";
import React from "react";
import {EditableSpan} from "./EditableSpan";
import Delete from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";

type TodoListTitlePropsType = {
    title: string
    onChangeCallBack: (title: string) => void
    callBack: () => void
}

export const TodoListTitle: React.FC<TodoListTitlePropsType> = React.memo(({
                                                                               title,
                                                                               onChangeCallBack,
                                                                               callBack,
                                                                               ...props
                                                                           }) => {
    // console.log('TodoListTitle')

    const onButtonClickHandler = () => callBack()

    return (
        <>
            <div className={s.title}>
                <EditableSpan title={title} callBack={onChangeCallBack}/>
                <IconButton color="primary" size='small' onClick={onButtonClickHandler}>
                    <Delete/>
                </IconButton>
            </div>
        </>
    )
})

