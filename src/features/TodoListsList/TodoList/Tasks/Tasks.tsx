import React, { useMemo } from "react"
import { List } from "@mui/material"
import { Task } from "./Task/Task"
import { TaskStatuses } from '../../../../Api/Api'
import { filterValueType } from '../../TodoList'
import { useAppSelector } from '../../../../utils/redux-utils'
import { StatusType } from '../../../../utils/types'


type AlternativeTasksPropsType = {
    todoStatus: StatusType
    todoListFilter: filterValueType
    todoListId: string
}

export const Tasks: React.FC<AlternativeTasksPropsType> = React.memo( ({
                                                                           todoStatus,
                                                                           todoListFilter,
                                                                           todoListId,
                                                                       }) => {

    const tasks = useAppSelector( state => state.tasks[todoListId] )
    const filteredTasks = useMemo( () => {
        if (!tasks) return []
        switch (todoListFilter) {
            case "All":
            default:
                return tasks
            case "Active":
                return tasks.filter( f => f.status === TaskStatuses.New )
            case "Completed":
                return tasks.filter( f => f.status === TaskStatuses.Completed )
        }
    }, [tasks, todoListFilter] )


    console.log( 'Tasks', todoListId )
    const mappedTasks = useMemo( () => filteredTasks
        && filteredTasks.map( m => <Task key={ m.id }
                                         todoStatus={ todoStatus }
                                         taskEntity={ m }
        /> ), [filteredTasks, todoStatus] )
    return (
        <div >
            <List>
                { mappedTasks }
            </List>
        </div>
    )
} )