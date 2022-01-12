import { v1 } from "uuid"
import tasksReducer, { createTask, deleteTask, fetchTasks, TasksStateType, TaskType, updateTask } from "./tasksReducer"
import { TaskStatuses } from '../../Api/Api'


const [todoListId1] = [v1()]
let startState: TasksStateType
let task: TaskType

beforeEach( () => {
    startState = {
        [todoListId1]: [
            {
                "id": "085fe348-1aeb-44d8-b701-f5cf11fde5eb",
                "title": "xd",
                "description": null,
                "todoListId": "acde81c8-5236-4b5c-9102-7a9fe6f807e5",
                "order": -2,
                "status": 0,
                "priority": 1,
                "startDate": null,
                "deadline": null,
                "addedDate": "2022-01-04T09:01:30.5646897Z",
            },
            {
                "id": "d3c02b56-ad40-41de-8c12-41182835c39b",
                "title": "fgh\\",
                "description": null,
                "todoListId": "acde81c8-5236-4b5c-9102-7a9fe6f807e5",
                "order": -1,
                "status": 0,
                "priority": 1,
                "startDate": null,
                "deadline": null,
                "addedDate": "2022-01-04T09:01:29.155147Z",
            },
        ],
    }
    task = {
        "id": "6c8a9579-2d76-4291-a06b-366c0983ae80",
        "title": "test",
        "description": null,
        "todoListId": "acde81c8-5236-4b5c-9102-7a9fe6f807e5",
        "order": -1,
        "status": 0,
        "priority": 1,
        "startDate": null,
        "deadline": null,
        "addedDate": "2022-01-04T08:56:18.3467936Z",
    }
} )

test( 'Set tasks to state', () => {
    const action = fetchTasks.fulfilled( { todoListId: todoListId1, items: [task] }, '', todoListId1 )
    const endState = tasksReducer( startState, action )
    expect( endState ).not.toBe( startState )
    expect( endState[todoListId1].length ).toBe( 1 )
    expect( endState[todoListId1][0] ).toBe( task )
    expect( endState[todoListId1][0] ).toEqual( task )
} )

test( 'Adding task test', () => {
    const action = createTask.fulfilled( { item: task, todoListId: todoListId1 }, '', {
        title: 'title',
        todoListId: todoListId1,
    } )

    const endState = tasksReducer( startState, action )

    expect( endState ).not.toBe( startState )
    expect( endState.length ).toBe( startState.length )
    expect( endState[todoListId1].find( f => f.title === 'test' ) ).toBeDefined()
} )

test( 'Remove task test', () => {
    const action = deleteTask.fulfilled( {
        todoListId: todoListId1,
        taskId: startState[todoListId1][0].id,
    }, '', { todoListId: todoListId1, taskId: startState[todoListId1][0].id } )

    const endState = tasksReducer( startState, action )

    expect( endState ).not.toBe( startState )
    expect( endState.length ).toBe( startState.length )
    expect( endState[todoListId1].length ).not.toBe( startState[todoListId1].length )
    expect( endState[todoListId1].find( f => f.id === '085fe348-1aeb-44d8-b701-f5cf11fde5eb' ) ).toBeUndefined()
} )

test( 'Rename task test', () => {
    const action = updateTask.fulfilled( {
        todoListId: todoListId1,
        task: { ...startState[todoListId1][0], title: 'title' },
    }, '', { task: startState[todoListId1][0], todoListId: todoListId1 } )

    const endState = tasksReducer( startState, action )

    expect( endState ).not.toBe( startState )
    expect( endState.length ).toBe( startState.length )
    expect( endState[todoListId1].length ).toBe( startState[todoListId1].length )
    expect( endState[todoListId1].find( f => f.id === "085fe348-1aeb-44d8-b701-f5cf11fde5eb" ) ).toBeDefined()
    expect( endState[todoListId1].find( f => f.id === "085fe348-1aeb-44d8-b701-f5cf11fde5eb" )?.title ).toBe( 'title' )
} )

test( 'Changing task status test', () => {
    const action = updateTask.fulfilled( {
        todoListId: todoListId1,
        task: { ...startState[todoListId1][0], status: TaskStatuses.Completed },
    }, '', { task: startState[todoListId1][0], todoListId: todoListId1 } )

    const endState = tasksReducer( startState, action )

    expect( endState ).not.toBe( startState )
    expect( endState.length ).toBe( startState.length )
    expect( endState[todoListId1].length ).toBe( startState[todoListId1].length )
    expect( endState[todoListId1].find( f => f.id === "085fe348-1aeb-44d8-b701-f5cf11fde5eb" ) ).toBeDefined()
    expect( startState[todoListId1].find( f => f.id === "085fe348-1aeb-44d8-b701-f5cf11fde5eb" ) ).toBeDefined()
    expect( endState[todoListId1].find( f => f.id === "085fe348-1aeb-44d8-b701-f5cf11fde5eb" )?.status ).toBe( TaskStatuses.Completed )
} )