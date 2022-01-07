import React, {useMemo} from "react";
import {List} from "@mui/material";
import {AlternativeTask} from "./AlternativeTask";
import {taskType} from "../../../../reducers/tasksReducer";
import { statusType } from '../../../../reducers/appReducer'

type AlternativeTasksPropsType = {
    tasks: Array<taskType>
    removeTask: (taskId: string) => void
    renameTask: (taskId: string, title: string) => void
    changeIsDone: (taskId: string) => void
    todoStatus: statusType
}

export const AlternativeTasks: React.FC<AlternativeTasksPropsType> = React.memo(({
                                                                                     tasks,
                                                                                     removeTask,
                                                                                     renameTask,
                                                                                     changeIsDone,
                                                                                     todoStatus,
                                                                                 }) => {

    // console.log('Tasks')
    const mappedTasks = useMemo(() => tasks
        && tasks.map(m => <AlternativeTask key={m.id}
                                                 title={m.title}
                                                 id={m.id}
                                                 status={m.status}
                                                 removeTask={removeTask}
                                                 renameTask={renameTask}
                                                 changeIsDone={changeIsDone}
                                                 todoStatus={todoStatus}
        />), [tasks, renameTask, removeTask, changeIsDone, todoStatus])
    return (
        <div className={'s.body'}>
            <List >
                {mappedTasks}
            </List>
        </div>
    )
}, )