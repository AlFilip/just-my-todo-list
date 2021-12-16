import React, { ChangeEventHandler, useCallback } from "react"
import { EditableSpan } from "../EditableSpan"
import Delete from "@mui/icons-material/Delete"
import { Checkbox, IconButton, ListItemButton } from "@mui/material"
import s from './Task.module.css'
import { TaskStatuses } from '../../../Api/Api'


export type TaskPropsType = {
    id: string
    title: string
    status: TaskStatuses
    removeTask: (taskId: string) => void
    renameTask: (taskId: string, title: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const Task: React.FC<TaskPropsType> = ({
                                                  id,
                                                  title,
                                                  status,
                                                  removeTask,
                                                  renameTask,
                                                  changeIsDone,
                                              }) => {

    // console.log('Task')
    const changeTitle = useCallback( (title: string) => renameTask( id, title ), [id, renameTask] )
    const onChangeCheckedHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        changeIsDone( id, e.currentTarget.checked )
    }
    const killTask = () => removeTask( id )

    return (
        <ListItemButton key={ id } id={ id }>
            <div className={ s.listContainer }>
                <div>
                    <Checkbox checked={ status === TaskStatuses.Completed } onChange={ onChangeCheckedHandler }/>
                    <EditableSpan title={ title }
                                  callBack={ changeTitle }
                    />
                </div>
                <IconButton color="primary" size='small' onClick={ killTask }>
                    <Delete/>
                </IconButton>
            </div>
        </ListItemButton>
    )
}