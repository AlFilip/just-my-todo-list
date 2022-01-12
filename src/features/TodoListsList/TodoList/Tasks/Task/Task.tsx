import React, { MouseEventHandler, useCallback, useState } from "react"
import Delete from "@mui/icons-material/Delete"
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import { AddItemForm } from "../../../../../Components/AdditemForm/AddItemForm"
import { TaskStatuses } from '../../../../../Api/Api'
import { tasksActions } from '../../../'
import { TaskType } from '../../../tasksReducer'
import { useActions } from '../../../../../utils/redux-utils'
import { StatusType } from '../../../../../utils/types'
import { MyTheme } from '../../../../../utils/theme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import s from './Task.module.css'


export type TaskPropsType = {
    todoStatus: StatusType
    taskEntity: TaskType
}

export const Task: React.FC<TaskPropsType> = React.memo( ({
                                                              todoStatus,
                                                              taskEntity,
                                                          }) => {
    const [editMode, setEditMode] = useState( false )
    const [active, setActive] = useState( false )
    const { id, title, fetchStatus, todoListId, status } = taskEntity
    const { updateTask, deleteTask } = useActions( tasksActions )

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
        <ThemeProvider theme={ MyTheme }>
            <ListItem
                key={ id }
                disablePadding
                disableGutters
                sx={ {
                    maxWidth: '13rem',
                } }
                onMouseEnter={ () => setActive( true ) }
                onMouseLeave={ () => setActive( false ) }
            >
                { editMode
                && <AddItemForm callBack={ renameTask } title={ title }
                                autoFocus
                                discardOnBlur
                                placeHolder={ 'Enter new task name' }
                /> }
                { !editMode
                && <ListItemButton key={ id } id={ id } onClick={ onChangeCheckedHandler }>

                    <ListItemIcon>
                        <Checkbox checked={ status === TaskStatuses.Completed }
                                  disabled={ isComponentDisabled }/>
                    </ListItemIcon>

                    <ListItemText primary={ title }/>
                    {
                        active && !editMode
                        &&
                        <div className={ s.actions }>
                            <IconButton edge="end" color="primary" size='small' onClick={ editIconOnClickHandler }
                                        disabled={ isComponentDisabled }>
                                <EditIcon/>
                            </IconButton>
                            <IconButton color="primary" size='small' sx={ { float: 'right' } }
                                        onClick={ killTask } disabled={ isComponentDisabled }>
                                <Delete/>
                            </IconButton>
                        </div>
                    }
                </ListItemButton> }

            </ListItem>
        </ThemeProvider>
    )
} )