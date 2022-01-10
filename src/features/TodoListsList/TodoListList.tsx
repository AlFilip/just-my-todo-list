import React from 'react'
import { Grid } from '@mui/material'
import { TodoList } from './TodoList'
import { todosSelectors } from './'
import { useAppSelector } from '../../utils/redux-utils'


export const TodoListsList = () => {
    const todoLists = useAppSelector( todosSelectors.selectTodos )

    const mappedTodoLists = todoLists.map( m =>
        <Grid item key={ m.id }>
            <TodoList todoListId={ m.id }
                      title={ m.title }
                      todoStatus={ m.todoStatus }/>
        </Grid> )

    return (
        <Grid container>
            {
                mappedTodoLists.length
                    ? mappedTodoLists
                    : 'нету тудулистов(((('
            }
        </Grid>
    )
}