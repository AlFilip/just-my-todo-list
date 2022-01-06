import { v1 } from "uuid"
import todoListReducer, { addTodoList, getTodos, removeTodoList, todoListType, updateTodoName } from './todoListReducer'


let startState: todoListType[]
let item: todoListType


const todoListId1 = v1()

beforeEach( () => {
    startState = [{
        "id": "7e2af062-5796-4a3e-ade8-77a111d4cc57",
        "title": "test2",
        "addedDate": "2022-01-05T09:14:37.527",
        "order": -2,
        todoStatus: 'idle',
    },
        {
            "id": "62c917a3-40b1-48ac-9df4-e42774e6ee8b",
            "title": "test",
            "addedDate": "2022-01-04T16:53:02.993",
            "order": -1,
            todoStatus: 'loading',
        }]
    item = {
        "id": "4aac717f-a302-48d6-be16-97aa773288e7",
        "title": "test3",
        "addedDate": "2022-01-05T09:16:26.6266408Z",
        "order": -3,
        todoStatus: 'idle',
    }
} )

// test( 'Set todos to state', () => {
//
// } )

test( 'Adding todo', () => {
    const action = addTodoList.fulfilled( { item }, '', 'test3' )

    const endState = todoListReducer( startState, action )

    expect( endState.length ).toBe( startState.length + 1 )
    expect( endState[0] ).toStrictEqual( item )
    expect( endState.slice( 1 ) ).toStrictEqual( startState )
} )

test( 'Remove todo', () => {

    const action = removeTodoList.fulfilled( { id: startState[0].id }, '', "7e2af062-5796-4a3e-ade8-77a111d4cc57" )

    const endState = todoListReducer( startState, action )

    expect( endState.length ).toBe( startState.length - 1 )
    expect( endState ).toStrictEqual( startState.slice( 1 ) )
} )


test( 'Rename todo', () => {
    const action = updateTodoName.fulfilled( { id: startState[0].id, title: 'NewTitle' }, '', {
        title: 'NewTitle',
        id: "7e2af062-5796-4a3e-ade8-77a111d4cc57",
    } )

    const endState = todoListReducer( startState, action )

    expect( endState.length ).toBe( startState.length )
    expect( endState.slice( 1 ) ).toStrictEqual( startState.slice( 1 ) )
    expect( endState[0] ).not.toBe( startState[0] )
    expect( endState[0].title ).toBe( 'NewTitle' )
} )

test( 'Set todos', () => {
    const action = getTodos.fulfilled( { items: [item] }, '' )

    const endState = todoListReducer( startState, action )

    expect(endState.length).toBe(1)
    expect(endState[0]).toStrictEqual(item)
} )
