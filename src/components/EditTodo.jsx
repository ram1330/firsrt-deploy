import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../redux/todosSlice";

const EditTodo = ({ todo, handleShow }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(todo.task);

  const handleEdit = () => {
    const editTodoObj = {
      task: value,
      completed: false,
      id: todo.id,
    };
    dispatch(editTodo(editTodoObj));
    handleShow();
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleEdit}>Save</button>
    </div>
  );
};

export default EditTodo;
