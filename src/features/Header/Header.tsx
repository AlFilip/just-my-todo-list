import React, { useCallback } from 'react'
import { AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material'
import { AddItemForm } from '../../Components/AdditemForm/AddItemForm'
import { useActions, useAppSelector } from '../../utils/redux-utils'
import { authActions, authSelectors } from '../Auth'
import { appSelectors } from '../Application'
import { todosActions } from '../TodoListsList'


export const Header = () => {
    const login = useAppSelector( authSelectors.selectUserName )
    const appStatus = useAppSelector( appSelectors.selectAppStatus )
    const isAuth = useAppSelector( authSelectors.selectIsAuth )
    const { addTodoList } = useActions( todosActions )
    const { logout } = useActions( authActions )

    const addTodo = useCallback( (title: string) => {
        addTodoList( title )
    }, [addTodoList] )


    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={ { mr: 2 } }
                    >
                        {/*<Menu/>*/ }
                    </IconButton>
                    <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
                        News
                    </Typography>

                    {
                        isAuth
                        && <>
                            <AddItemForm callBack={ addTodo } buttonTitle={ 'Add TodoListsList' }
                                         placeHolder={ 'Enter new to-do list name' }/>
                            { login }
                            <Button onClick={ logout } color="inherit">
                                Logout
                            </Button>
                        </>
                    }
                </Toolbar>
                <div style={ { height: 4 } }>
                    { appStatus === 'loading' && <LinearProgress color="secondary"/> }
                </div>
            </AppBar>
        </Box>

    )
}