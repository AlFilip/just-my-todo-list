import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react"
import s from './TodoList.module.css'
import { TodoListTitle } from "./TodoListTitle"
import { useDispatch, useSelector } from "react-redux"
import { allStateType } from "../../redux/store"
import { createTask, deleteTask, fetchTasks, taskType, updateTask } from "../../reducers/tasksReducer"
import { Button, ButtonGroup } from "@mui/material"
import { AddItemForm } from "../Common/AdditemForm/AddItemForm"
import { AlternativeTasks } from "./Tasks/AlternativeTasks/AlternativeTasks"
import { removeTodoList, updateTodoName } from "../../reducers/todoListReducer"
import { TaskStatuses } from '../../Api/Api'
import { statusType } from '../../reducers/appReducer'


type TodoListPropsType = {
    todoListId: string
    title: string
    todoStatus: statusType
}
export type filterValueType = 'All' | 'Completed' | 'Active'

export const TodoList: React.FC<TodoListPropsType> = React.memo( ({
                                                                      todoListId,
                                                                      title,
                                                                      todoStatus,
                                                                      // tasks,
                                                                      ...props
                                                                  }) => {
    // console.log('TodoList')
    const dispatch = useDispatch()
    const [todoListFilter, setTodoListFilter] = useState<filterValueType>( 'All' )
    const tasks = useSelector<allStateType, taskType[]>( state => state.tasks[todoListId] )
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

    useEffect( () => {
        dispatch( fetchTasks( todoListId ) )
    }, [dispatch, todoListId] )

    const removeTodo = useCallback( () => {
        dispatch( removeTodoList( todoListId ) )
    }, [dispatch, todoListId] )

    const changeTodoTitle = useCallback( (title: string) => {
        dispatch( updateTodoName( { id: todoListId, title } ) )
    }, [dispatch, todoListId] )

    const addTask = useCallback( (title: string) => {
        dispatch( createTask( { todoListId, title } ) )
    }, [dispatch, todoListId] )

    const removeTask = useCallback( (taskId: string) => {
        dispatch( deleteTask( { todoListId, taskId } ) )
    }, [dispatch, todoListId] )

    const renameTask = useCallback( (taskId: string, title: string) => {
        const task = filteredTasks.find( f => {
            return f.id === taskId
        } )
        if (task) {
            dispatch( updateTask( { todoListId, task: { ...task, title } }) )
        }
    }, [dispatch, todoListId, filteredTasks] )

    const changeIsDone = useCallback( (taskId: string) => {
        const task = filteredTasks.find( f => {
            return f.id === taskId
        } )
        if (task) {
            dispatch( updateTask( {
                todoListId, task: {
                    ...task,
                    status: ( task.status === TaskStatuses.Completed ) ? TaskStatuses.New : TaskStatuses.Completed,
                },
            } ) )
        }
    }, [dispatch, todoListId, filteredTasks] )

    const changeFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
        const filterValue = e.currentTarget.dataset.filter as filterValueType
        filterValue
        && setTodoListFilter( filterValue )
    }

    const buttons = useMemo( () => ['All', 'Active', 'Completed']
        .map( m => <Button key={ m }
                           variant={ todoListFilter === m ? 'contained' : 'outlined' }
                           data-filter={ m }
                           onClick={ changeFilter }>{ m }
            </Button>,
        ), [todoListFilter],
    )
    return (
        <div className={ s.todoList }>
            <TodoListTitle title={ title }
                           callBack={ removeTodo }
                           onChangeCallBack={ changeTodoTitle }
                           disabled={todoStatus === 'loading'}
            />
            <AddItemForm callBack={ addTask } placeHolder={ 'Enter new task name' }/>
            <AlternativeTasks tasks={ filteredTasks }
                              renameTask={ renameTask }
                              changeIsDone={ changeIsDone }
                              removeTask={ removeTask }
                                          />

            <div className={ s.filters }>
                <ButtonGroup variant="outlined" size='small'>
                    { buttons }
                </ButtonGroup>
            </div>
        </div>
    )
} )