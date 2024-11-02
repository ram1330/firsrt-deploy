import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getAllTodos } from "./redux/todosSlice";
import TodoItem from "./components/TodoItem.jsx";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  const handleAdd = () => {
    const newTodo = {
      id: Date.now(),
      task: value,
      completed: false,
    };
    dispatch(addTodo(newTodo));
    setValue("");
  };


  return (
    <div className="App">
      <h1>Add todo</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <br />
      <br />

      <h2>Todos</h2>
      <ul>
        {todos.map((el) => {
          return (
            <TodoItem todo={el} key={el.id}/>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
