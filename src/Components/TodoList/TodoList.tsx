import React, {MouseEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import s from './TodoList.module.css'
import {filterValueType} from "../../App";
import {TodoListTitle} from "./TodoListTitle";
import {useDispatch, useSelector} from "react-redux";
import {allStateType} from "../../redux/store";
import {
    // changeTaskCompletedInState,
    createTask, deleteTask,
    initTasks,
    removeTaskFromState,
    // renameTaskInState,
    taskType, updateTask
} from "../../reducers/tasksReducer";
import {Button, ButtonGroup} from "@mui/material";
import {AddItemForm} from "../Common/AdditemForm/AddItemForm";
import {AlternativeTasks} from "./Tasks/AlternativeTasks/AlternativeTasks";
import {removeTodoList, renameTodoInState} from "../../reducers/todoListReducer";

type TodoListPropsType = {
    todoListId: string
    title: string
    // filter: FilterValueType
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     todoListId,
                                                                     title,
                                                                     // filter,
                                                                     // tasks,
                                                                     ...props
                                                                 }) => {
    // console.log('TodoList')
    const dispatch = useDispatch()
    const [todoListFilter, setTodoListFilter] = useState<filterValueType>('All')
    const tasks = useSelector<allStateType, taskType[]>(state => state.tasks[todoListId])
    const filteredTasks = useMemo(() => {
        if (!tasks) return []
        switch (todoListFilter) {
            case "All":
            default:
                return tasks
            case "Active":
                return tasks.filter(f => !f.completed)
            case "Completed":
                return tasks.filter(f => f.completed)
        }
    }, [tasks, todoListFilter])

    useEffect(() => {
        dispatch(initTasks(todoListId))
    }, [])

    const removeTodo = useCallback(() => {
        dispatch(removeTodoList(todoListId))
    }, [dispatch, todoListId])

    const changeTodoTitle = useCallback((title: string) => {
        dispatch(renameTodoInState(todoListId, title))
    }, [dispatch, todoListId])

    const addTask = useCallback((title: string) => {
        dispatch(createTask(todoListId, title))
    }, [dispatch, todoListId])

    const removeTask = useCallback((taskId: string) => {
        dispatch(deleteTask(todoListId, taskId))
    }, [dispatch, todoListId])

    const renameTask = useCallback((taskId: string, title: string) => {
        // dispatch(renameTaskInState(todoListId, taskId, title))
    }, [dispatch, todoListId])

    const changeIsDone = useCallback((taskId: string, isDone: boolean) => {
        const task = filteredTasks.find(f => f.id === taskId)
        debugger
        if (task) {
            task.completed = isDone
            dispatch(updateTask(todoListId, task))
        }
    }, [dispatch, todoListId])

    const changeFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
        const filterValue = e.currentTarget.dataset.filter as filterValueType
        filterValue
        && setTodoListFilter(filterValue)
    }

    const buttons = useMemo(() => ['All', 'Active', 'Completed']
        .map(m => <Button key={m}
                          variant={todoListFilter === m ? 'contained' : 'outlined'}
                          data-filter={m}
                          onClick={changeFilter}>{m}
            </Button>
        ), [todoListFilter]
    )
    return (
        <div className={s.todoList}>
            <TodoListTitle title={title}
                           callBack={removeTodo}
                           onChangeCallBack={changeTodoTitle}
            />
            <AddItemForm callBack={addTask} placeHolder={'Enter new task name'}/>
            <AlternativeTasks tasks={filteredTasks}
                              renameTask={renameTask}
                              changeIsDone={changeIsDone}
                              removeTask={removeTask}
            />

            <div className={s.filters}>
                <ButtonGroup variant="outlined" size='small'>
                    {buttons}
                </ButtonGroup>
            </div>
        </div>
    )
})