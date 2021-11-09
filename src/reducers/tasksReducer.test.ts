import {v1} from "uuid";
import {addTaskAC, changeTaskCompletedInState, removeTaskFromState, renameTaskInState, tasksReducer} from "./tasksReducer";

const [todoListId1, todoListId2] = [v1(), v1()]
const startState = {
    [todoListId1]: [
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true}
    ],
    [todoListId2]: [
        {id: '3', title: "Milk", isDone: true},
        {id: '4', title: "React Book", isDone: false}
    ]
}
test('Adding task test', () => {
    const action = addTaskAC(todoListId1, 'title')

    const endState = tasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(startState.length)
    expect(endState[todoListId1].find(f => f.title === 'title')).toBeDefined()
})

test('Remove task test', () => {
    const action = removeTaskFromState(todoListId1, '1')

    const endState = tasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(startState.length)
    expect(endState[todoListId1].length).not.toBe(startState[todoListId1].length)
    expect(endState[todoListId1].find(f => f.id === '1')).toBeUndefined()
})

test('Rename task test', () => {
    const action = renameTaskInState(todoListId1, '1', 'title')

    const endState = tasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(startState.length)
    expect(endState[todoListId1].length).toBe(startState[todoListId1].length)
    expect(endState[todoListId1].find(f => f.id === '1')).toBeDefined()
    expect(endState[todoListId1].find(f => f.id === '1')?.title).toBe('title')
})

test('Changing task status test', () => {
    const action = changeTaskCompletedInState(todoListId1, '1', false)

    const endState = tasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(startState.length)
    expect(endState[todoListId1].length).toBe(startState[todoListId1].length)
    expect(endState[todoListId1].find(f => f.id === '1')).toBeDefined()
    expect(startState[todoListId1].find(f => f.id === '1')).toBeDefined()
    expect(endState[todoListId1].find(f => f.id === '1')?.isDone).toBe(false)
})