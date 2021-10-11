import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";


type TaskType = {id: string, title: string, isDone: boolean}

type TasksStateType = {
  [todoListId: string]: TaskType[]
}

type FilterValueType = 'all' | 'completed' | 'active'
type TodoListType = {id: string, title: string, filter: FilterValueType}

function App() {
  const [todoListId1, todoListId2] = [v1(), v1()]
  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todoListId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  })


  return (
    <div className="App">

    </div>
  );
}

export default App;
