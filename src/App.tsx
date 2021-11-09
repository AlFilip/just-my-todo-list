import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {allStateType} from "./redux/store";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {AddItemForm} from "./Components/Common/AdditemForm/AddItemForm";
import {authApi, todoListApi} from "./Api/Api";
import {authStateType, setAuthData} from "./reducers/authReducer";
import {todoListType} from "./reducers/todoListReducer";


export type filterValueType = 'All' | 'Completed' | 'Active'
// export type TodoListType = { id: string, title: string, filter: FilterValueType }

function App(){
    console.log('App')
    const {isAuth, login} = useSelector<allStateType, authStateType>(state => state.auth)
    const todoLists = useSelector<allStateType, Array<todoListType>>(state => state.todo)

    const dispatch = useDispatch<Dispatch<any>>()

    useEffect(() => {
        !isAuth
        && authApi.me()
            .then(data => {
                data
                && dispatch(setAuthData({...data, isAuth: true}))
            })
    }, [dispatch, isAuth])

    useEffect(() => {
        isAuth
        && todoListApi.getTodoLists()
            .then(res => {
                debugger
            })
    }, [dispatch, isAuth])

    const addTodo = useCallback((title: string) => {
        // dispatch(addTodoList(title))
    }, [dispatch])

    const mappedTodoLists = todoLists.map(m =>
        <Grid item key={m.id}>
            <TodoList todoListId={m.id}
                      title={m.title}
            />
        </Grid>)

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{mr: 2}}
                        >
                            {/*<Menu/>*/}
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <AddItemForm callBack={addTodo} buttonTitle={'Add TodoList'}
                                     placeHolder={'Enter new to-do list name'}/>
                        {isAuth
                            ? login
                            : <Button color="inherit">
                                Login
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>


            <Container>
                <Grid container>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
