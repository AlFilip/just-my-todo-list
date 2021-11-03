import s from "./TodoList.module.css";
import React, {ChangeEventHandler, KeyboardEventHandler, useState} from "react";
import {EditableSpan} from "./EditableSpan";

type TodoListTitlePropsType = {
    title: string
    onChangeCallBack: (title: string) => void
    callBack: () => void
    addTask: (title: string) => void
}

export const TodoListTitle: React.FC<TodoListTitlePropsType> = React.memo(({
                                                                               title,
                                                                               onChangeCallBack,
                                                                               callBack,
                                                                               ...props
                                                                           }) => {
    // console.log('TodoListTitle')
    const [addTaskMode, setAddTaskMode] = useState(false)
    const [addTaskValue, setAddTaskValue] = useState('')
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setAddTaskValue(e.currentTarget.value)
    }
    const toggleAddTaskMode = () => {
        setAddTaskMode(!addTaskMode)
        addTaskValue
        && addTask()
    }
    const onButtonClickHandler = () => callBack()
    const addTask = () => {
        props.addTask(addTaskValue)
        setAddTaskValue('')
    }
    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        e.key === 'Enter' && toggleAddTaskMode()
    }
    return (
        <>
            <div className={s.btnDiv}>
                <button className={s.deleteBtn} onClick={onButtonClickHandler}>x</button>
            </div>
            <div className={s.title}>
                <EditableSpan title={title}
                              callBack={onChangeCallBack}
                />
                <button onClick={toggleAddTaskMode}>+</button>
                <div>
                    {addTaskMode && <input autoFocus
                                           type="text"
                                           value={addTaskValue}
                                           onChange={onChangeHandler}
                                           onKeyDown={onKeyDownHandler}
                    />}
                </div>
            </div>
        </>
    )
})

