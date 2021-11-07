import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList/TodoList";
import {EditableSpan} from "./Components/TodoList/EditableSpan";
import {actionsTypes, addTodoList} from "./actions/todoListActions";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {allStateType} from "./redux/store";
import {AppBar, Box, Button, Container, Grid, IconButton, Menu, Toolbar, Typography} from "@mui/material";
import {AddItemForm} from "./Components/Common/AdditemForm/AddItemForm";


export type TaskType = { id: string, title: string, isDone: boolean }

export type TasksStateType = {
    [todoListId: string]: TaskType[]
}

export type FilterValueType = 'All' | 'Completed' | 'Active'
export type TodoListType = { id: string, title: string, filter: FilterValueType }

function App() {
    console.log('App')
    const dispatch = useDispatch<Dispatch<actionsTypes>>()
    const todoLists = useSelector<allStateType, Array<TodoListType>>(state => state.todo)

    const addTodo = useCallback((title: string) => {
        dispatch(addTodoList({title}))
    }, [dispatch])

    const mappedTodoLists = todoLists.map(m =>
        <Grid item key={m.id}>
            <TodoList key={m.id}
                      todoListId={m.id}
                      filter={m.filter}
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
                        <AddItemForm callBack={addTodo} buttonTitle={'Add TodoList'}/>
                        <Button color="inherit">Login</Button>
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
