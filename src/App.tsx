import React, { useCallback, useEffect } from 'react'
import './App.css'
import { TodoList } from "./Components/TodoList/TodoList"
import { useDispatch, useSelector } from "react-redux"
import { allStateType } from "./redux/store"
import { AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { AddItemForm } from "./Components/Common/AdditemForm/AddItemForm"
import { addTodoList, todoListType } from "./reducers/todoListReducer"
import { initApp, statusType } from './reducers/appReducer'
import LinearProgress from '@mui/material/LinearProgress'
import { ErrorSnackbar } from './Components/Common/ErrorSnackBar/ErrorSnackBar'


function App() {
    console.log( 'App' )
    const isAuth = useSelector<allStateType, boolean>( state => state.auth.isAuth )
    const login = useSelector<allStateType, null | string>( state => state.auth.login )
    const appStatus = useSelector<allStateType, statusType>( state => state.app.status )

    const todoLists = useSelector<allStateType, Array<todoListType>>( state => state.todo )

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( initApp() )
    }, [dispatch] )


    const addTodo = useCallback( (title: string) => {
        dispatch( addTodoList( title ) )
    }, [dispatch] )

    const mappedTodoLists = todoLists.map( m =>
        <Grid item key={ m.id }>
            <TodoList todoListId={ m.id }
                      title={ m.title }
                      todoStatus={ m.todoStatus }
            />
        </Grid> )

    return (
        <div className="App">
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
                        <AddItemForm callBack={ addTodo } buttonTitle={ 'Add TodoList' }
                                     placeHolder={ 'Enter new to-do list name' }/>
                        { isAuth
                            ? login
                            : <Button color="inherit">
                                Login
                            </Button>
                        }
                    </Toolbar>
                    <div style={ { height: 4 } }>
                        { appStatus === 'loading' && <LinearProgress color="secondary"/> }
                    </div>
                </AppBar>
            </Box>

            <Container>
                <Grid container>
                    { mappedTodoLists }
                </Grid>
                <ErrorSnackbar/>
            </Container>
        </div>
    )
}

export default App
