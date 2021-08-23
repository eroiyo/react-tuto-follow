import React from "react"

function TodoItem(props) {
  return <li><input 
  type="checkbox"
  onChange={() => props.handleChangeProps(props.todo.id)}
  checked={props.todo.completed} />{props.todo.title}
<button onClick={() => props.deleteTodoProps(props.todo.id)}>
  Delete
</button></li>
}

export default TodoItem