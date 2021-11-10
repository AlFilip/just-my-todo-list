import React, {useMemo} from "react";
import {List} from "@mui/material";
import {AlternativeTask} from "./AlternativeTask";
import {taskType} from "../../../../reducers/tasksReducer";

type AlternativeTasksPropsType = {
    tasks: Array<taskType>
    removeTask: (taskId: string) => void
    renameTask: (taskId: string, title: string) => void
    changeIsDone: (taskId: string) => void
}

export const AlternativeTasks: React.FC<AlternativeTasksPropsType> = React.memo((props) => {

    // console.log('Tasks')
    const mappedTasks = useMemo(() => props.tasks
        && props.tasks.map(m => <AlternativeTask key={m.id}
                                                 title={m.title}
                                                 id={m.id}
                                                 completed={m.completed}
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