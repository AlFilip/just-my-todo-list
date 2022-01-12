import React, { MouseEventHandler, useCallback, useMemo, useState } from "react"
import { Button, ButtonGroup, Paper } from "@mui/material"
import s from './TodoList/TodoList.module.css'
import { TodoListTitle } from "./TodoList/TodoListTitle"
import { tasksActions, todosActions } from "./"
import { AddItemForm } from "../../Components/AdditemForm/AddItemForm"
import { Tasks } from "./TodoList/Tasks/Tasks"
import { useActions } from '../../utils/redux-utils'
import { StatusType } from '../../utils/types'


type TodoListPropsType = {
    todoListId: string
    title: string
    todoStatus: StatusType
}
export type filterValueType = 'All' | 'Completed' | 'Active'

export const TodoList: React.FC<TodoListPropsType> = React.memo( ({
                                                                      todoListId,
                                                                      title,
                                                                      todoStatus,
                                                                      ...props
                                                                  }) => {
    console.log( 'TodoListsList', todoListId )
    const [todoListFilter, setTodoListFilter] = useState<filterValueType>( 'All' )

    const { removeTodoList, updateTodoName } = useActions( todosActions )
    const { createTask } = useActions( tasksActions )

    const removeTodo = useCallback( () => {
        removeTodoList( { todoListId} )
    }, [removeTodoList, todoListId] )

    const changeTodoTitle = useCallback( (title: string) => {
        updateTodoName( { todoListId, title } )
    }, [updateTodoName, todoListId] )

    const addTask = useCallback( (title: string) => {
        createTask( { todoListId, title } )
    }, [createTask, todoListId] )

    const changeFilter: MouseEventHandler<HTMLButtonElement> = e => {
        const filterValue = e.currentTarget.dataset.filter as filterValueType
        if (filterValue) {
            setTodoListFilter( filterValue )
        }
    }

    const buttons = useMemo( () => ['All', 'Active', 'Completed']
        .map( m => <Button key={ m }
                           variant={ todoListFilter === m ? 'contained' : 'outlined' }
                           data-filter={ m }
                           onClick={ changeFilter }
                           disabled={ todoStatus === 'loading' }
            >
                { m }
            </Button>,
        ), [todoListFilter, todoStatus],
    )
    return (
        <Paper elevation={ 10 }
               sx={ {
                   padding: '0.6rem',
                   margin: '1rem',
                   border: '2px solid rgba( 40, 40, 40, 0.3 )',
                   backgroundColor: '#F3F2F3',
                   maxWidth: 278,
               } }>

            <TodoListTitle title={ title }
                           callBack={ removeTodo }
                           onChangeCallBack={ changeTodoTitle }
                           disabled={ todoStatus === 'loading' }
            />

            <AddItemForm style={ { width: '100%' } } callBack={ addTask } placeHolder={ 'Enter new task name' }
                         disabled={ todoStatus === 'loading' }/>

            <Tasks
                todoStatus={ todoStatus }
                todoListFilter={ todoListFilter }
                todoListId={ todoListId }
            />

            <div className={ s.filters }>
                <ButtonGroup variant="outlined" size='small'>
                    { buttons }
                </ButtonGroup>
            </div>

        </Paper>
    )
} )