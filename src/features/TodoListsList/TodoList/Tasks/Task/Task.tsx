import React, { MouseEventHandler, useCallback, useState } from "react"
import Delete from "@mui/icons-material/Delete"
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import { AddItemForm } from "../../../../../Components/AdditemForm/AddItemForm"
import { TaskStatuses } from '../../../../../Api/Api'
import { statusType } from '../../../../Application/appReducer'
import { tasksActions } from '../../../'
import { taskType } from '../../../tasksReducer'
import { useActions } from '../../../../../utils/redux-utils'


export type TaskPropsType = {
    todoStatus: statusType
    taskEntity: taskType
}

export const Task: React.FC<TaskPropsType> = React.memo( ({
                                                              todoStatus,
                                                              taskEntity,
                                                          }) => {
    const [editMode, setEditMode] = useState( false )
    const { id, title, fetchStatus, todoListId, status } = taskEntity
    const { updateTask, deleteTask } = useActions(tasksActions)

    console.log( 'task', id )

    const onChangeCheckedHandler = () => {
        if (fetchStatus === 'idle') {
            changeIsDone()
        }
    }

    const killTask: MouseEventHandler<HTMLButtonElement> = e => {
        e.stopPropagation()
        removeTask( id )
        console.log( todoStatus )
    }

    const editIconOnClickHandler: MouseEventHandler<HTMLButtonElement> = e => {
        setEditMode( true )
        e.stopPropagation()
    }

    const renameTask = useCallback( (newTitle: string) => {
            if (newTitle !== title) {
                updateTask( { todoListId, task: { ...taskEntity, title: newTitle } } )
            }
            setEditMode( false )
        }, [updateTask, todoListId, taskEntity, title],
    )

    const changeIsDone = useCallback( () => {
        if (fetchStatus === 'idle') {
            updateTask( {
                todoListId, task: {
                    ...taskEntity,
                    status: ( taskEntity.status === TaskStatuses.Completed ) ? TaskStatuses.New : TaskStatuses.Completed,
                },
            } )
        }
    }, [updateTask, todoListId, taskEntity] )

    const removeTask = useCallback( (taskId: string) => {
        deleteTask( { todoListId, taskId } )
    }, [deleteTask, todoListId] )

    const isComponentDisabled = todoStatus === 'loading' || fetchStatus === 'loading'

    return (
        <ListItem
            key={ id }
            secondaryAction={
                !editMode
                && <IconButton color="primary" size='small' onClick={ killTask } disabled={ isComponentDisabled }>
                    <Delete/>
                </IconButton>
            }
            disablePadding
            disableGutters
        >
            { editMode
            && <AddItemForm callBack={ renameTask } title={ title }
                            autoFocus
                            discardOnBlur
                            placeHolder={ 'Enter new task name' }
            /> }
            { !editMode
            && <ListItemButton key={ id } id={ id } onClick={ onChangeCheckedHandler }>

                <ListItemIcon sx={ { minWidth: '36px' } }>
                    <Checkbox checked={ status === TaskStatuses.Completed } sx={ { padding: 0 } }
                              disabled={ isComponentDisabled }/>
                </ListItemIcon>

                <ListItemText primary={ title }/>

                <IconButton edge="end" color="primary" size='small' onClick={ editIconOnClickHandler }
                            disabled={ isComponentDisabled }>
                    <EditIcon/>
                </IconButton>

            </ListItemButton> }
        </ListItem>
    )
} )