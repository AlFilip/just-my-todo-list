import React, {ChangeEventHandler} from "react";
import {EditableSpan} from "../EditableSpan";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskId: string) => void
    renameTask: (taskId: string, title: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const Task: React.FC<TaskPropsType> = ({
                                                  id,
                                                  title,
                                                  isDone,
                                                  ...props
                                              }) => {

    const renameTask = (title: string) => props.renameTask(id, title)
    const onChangeIsDoneHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        props.changeIsDone(id, e.currentTarget.checked)
    }
    const removeTask = () => props.removeTask(id)

    return (
        <li key={id} id={id}>
            <EditableSpan title={title}
                          callBack={renameTask}
            />
            <input type="checkbox" checked={isDone} onChange={onChangeIsDoneHandler}/>
            <button onClick={removeTask}>x</button>
        </li>
    )
}