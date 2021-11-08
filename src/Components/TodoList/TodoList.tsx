import React, {MouseEventHandler, useCallback, useMemo, useState} from "react";
import s from './TodoList.module.css'
import {FilterValueType, TaskType} from "../../App";
import {TodoListTitle} from "./TodoListTitle";
import {useDispatch, useSelector} from "react-redux";
import {allStateType} from "../../redux/store";
import {removeTodoList, renameTodoList} from "../../actions/todoListActions";
import {Dispatch} from "redux";
import {addTaskAC, changeIsDoneAC, removeTaskAC, renameTaskAC} from "../../reducers/tasksReducer";
import {Button, ButtonGroup} from "@mui/material";
import {AddItemForm} from "../Common/AdditemForm/AddItemForm";
import {AlternativeTasks} from "./Tasks/AlternativeTasks/AlternativeTasks";

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValueType
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     todoListId,
                                                                     title,
                                                                     filter,
                                                                     // tasks,
                                                                     ...props
                                                                 }) => {
    // console.log('TodoList')
    const dispatch = useDispatch<Dispatch>()
    const [todoListFilter, setTodoListFilter] = useState(filter)
    const tasks = useSelector<allStateType, TaskType[]>(state => state.tasks[todoListId])
    const filteredTasks = useMemo(() => {
        if (!tasks) return []
        switch (todoListFilter) {
            case "All":
            default:
                return tasks
            case "Active":
                return tasks.filter(f => !f.isDone)
            case "Completed":
                return tasks.filter(f => f.isDone)
        }
    }, [tasks, todoListFilter])

    const removeTodo = useCallback(() => {
        dispatch(removeTodoList({todoListId}))
    }, [dispatch, todoListId])

    const changeTodoTitle = useCallback((title: string) => {
        dispatch(renameTodoList({todoListId, title}))
    }, [dispatch, todoListId])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [dispatch, todoListId])

    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [dispatch, todoListId])

    const renameTask = useCallback((taskId: string, title: string) => {
        dispatch(renameTaskAC(todoListId, taskId, title))
    }, [dispatch, todoListId])

    const changeIsDone = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeIsDoneAC(todoListId, taskId, isDone))
    }, [dispatch, todoListId])

    const changeFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
        const filterValue = e.currentTarget.dataset.filter as FilterValueType
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