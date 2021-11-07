import React, {ChangeEventHandler, useCallback} from "react";
import {EditableSpan} from "../EditableSpan";
import Delete from "@mui/icons-material/Delete";
import {Checkbox, IconButton, ListItemButton} from "@mui/material";

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

    // console.log('Task')
    const changeTitle = useCallback((title: string) => renameTask(id, title), [id, renameTask])
    const onChangeCheckedHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        changeIsDone(id, e.currentTarget.checked)
    }
    const killTask = () => removeTask(id)

    return (
        <ListItemButton key={id} id={id}>
            <EditableSpan title={title}
                          callBack={changeTitle}
            />
            <Checkbox checked={isDone} onChange={onChangeCheckedHandler}/>
            <IconButton color="primary" aria-label="add" size='small' onClick={killTask}>
                <Delete/>
            </IconButton>
        </ListItemButton>
    )
}