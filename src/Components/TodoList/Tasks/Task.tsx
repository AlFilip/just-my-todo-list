import React, {ChangeEventHandler, useCallback} from "react";
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
                                                  removeTask,
                                                  renameTask,
                                                  changeIsDone,
                                              }) => {

    const changeTitle = useCallback((title: string) => renameTask(id, title),[id, renameTask])
    const onChangeCheckedHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        changeIsDone(id, e.currentTarget.checked)
    }
    const killTask = () => removeTask(id)

    return (
        <li key={id} id={id}>
            <EditableSpan title={title}
                          callBack={changeTitle}
            />
            <input type="checkbox" checked={isDone} onChange={onChangeCheckedHandler}/>
            <button onClick={killTask}>x</button>
        </li>
    )
}