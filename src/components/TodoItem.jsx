import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditTodo from "./EditTodo";
import { deleteTodo } from "../redux/todosSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div>
      <span>{todo.task}</span>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleShow}>Edit</button>
      {show ? <EditTodo todo={todo} handleShow={handleShow}/> : null}
    </div>
  );
};

export default TodoItem;
