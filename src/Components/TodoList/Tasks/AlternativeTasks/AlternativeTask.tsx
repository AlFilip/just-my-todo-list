import React, { MouseEventHandler, useCallback, useState } from "react"
import Delete from "@mui/icons-material/Delete"
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import { AddItemForm } from "../../../Common/AdditemForm/AddItemForm"
import { TaskStatuses } from '../../../../Api/Api'


export type TaskPropsType = {
    id: string
    title: string
    status: TaskStatuses
    removeTask: (taskId: string) => void
    renameTask: (taskId: string, title: string) => void
    changeIsDone: (taskId: string) => void
}

export const AlternativeTask: React.FC<TaskPropsType> = ({
                                                             id,
                                                             title,
                                                             status,
                                                             removeTask,
                                                             renameTask,
                                                             changeIsDone,
                                                         }) => {

    // console.log('Task')
    const changeTitle = useCallback( (title: string) => {
        renameTask( id, title )
        setEditMode( false )
    }, [id, renameTask] )
    const onChangeCheckedHandler = () => changeIsDone( id )

    const killTask: MouseEventHandler<HTMLButtonElement> = (e) => {
        removeTask( id )
        e.stopPropagation()
    }
    const [editMode, setEditMode] = useState( false )
    const editIconOnClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        setEditMode( true )
        e.stopPropagation()
    }


    return (
        <ListItem
            key={ id }
            secondaryAction={
                !editMode
                && <IconButton color="primary" size='small' onClick={ killTask }>
                    <Delete/>
                </IconButton>
            }
            disablePadding
            disableGutters
        >
            { editMode
            && <AddItemForm callBack={ changeTitle } title={ title }
                            autoFocus
                            discardOnBlur
                            placeHolder={ 'Enter new task name' }
            /> }
            { !editMode
            && <ListItemButton key={ id } id={ id } onClick={ onChangeCheckedHandler }>

                <ListItemIcon sx={ { minWidth: '36px' } }>
                    <Checkbox checked={ status === TaskStatuses.Completed } sx={ { padding: 0 } }/>
                </ListItemIcon>

                <ListItemText primary={ title }/>

                <IconButton edge="end" color="primary" size='small' onClick={ editIconOnClickHandler }>
                    <EditIcon/>
                </IconButton>

            </ListItemButton> }
        </ListItem>
    )
}
