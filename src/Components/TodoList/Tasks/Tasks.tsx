import React, {useMemo} from "react";
import s from "../TodoList.module.css";
import {Task} from "./Task";
import {List} from "@mui/material";
import {taskType} from "../../../reducers/tasksReducer";

type TasksPropsType = {
    tasks: Array<taskType>
    removeTask: (taskId: string) => void
    renameTask: (taskId: string, title: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const Tasks: React.FC<TasksPropsType> = React.memo((props) => {

    // console.log('Tasks')
    const mappedTasks = useMemo(() => props.tasks
        && props.tasks.map(m => <Task key={m.id}
                                      title={m.title}
                                      id={m.id}
                                      isDone={m.completed}
                                      removeTask={props.removeTask}
                                      renameTask={props.renameTask}
                                      changeIsDone={props.changeIsDone}
        />), [props.tasks, props.renameTask, props.removeTask, props.changeIsDone])

    return (
        <div className={s.body}>
            <List>
                {mappedTasks}
            </List>
        </div>
    )
})