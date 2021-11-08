import React, {useMemo} from "react";
import {List} from "@mui/material";
import {TaskType} from "../../../../App";
import {AlternativeTask} from "./AlternativeTask";

type AlternativeTasksPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    renameTask: (taskId: string, title: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const AlternativeTasks: React.FC<AlternativeTasksPropsType> = React.memo((props) => {

    // console.log('Tasks')
    const mappedTasks = useMemo(() => props.tasks
        && props.tasks.map(m => <AlternativeTask key={m.id}
                                                 title={m.title}
                                                 id={m.id}
                                                 isDone={m.isDone}
                                                 removeTask={props.removeTask}
                                                 renameTask={props.renameTask}
                                                 changeIsDone={props.changeIsDone}
        />), [props.tasks, props.renameTask, props.removeTask, props.changeIsDone])

    return (
        <div className={'s.body'}>
            <List >
                {mappedTasks}
            </List>
        </div>
    )
})