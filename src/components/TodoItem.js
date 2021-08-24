import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.css';

function TodoItem(props) {
  const [state, setState] = useState({
    editing: false,
  });

  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const handleEditing = () => {
    setState({ editing: true });
  };

  const viewMode = {};
  const editMode = {};

  if (state.editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setState({ editing: false });
    }
  };
  const { handleChangeProps, deleteTodoProps, todo } = props;

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={props.todo.completed}
          onChange={() => handleChangeProps(props.todo.id)}
        />
        <button onClick={() => deleteTodoProps(props.todo.id)}>
          Delete
        </button>
        <span style={todo.completed ? completedStyle : null}>
          {todo.title}
        </span>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={todo.title}
        onChange={(e) => {
          props.setUpdate(e.target.value, todo.id);
        }}
        onKeyDown={handleUpdatedDone}
      />

    </li>
  );
}

TodoItem.PropTypes = {
  handleChangeProps: PropTypes.func,
  deleteTodoProps: PropTypes.func,
  setUpdate: PropTypes.func,
};

TodoItem.defaultProps = {
  todos: {},
  handleChangeProps: () => {},
  deleteTodoProps: () => {},
  setUpdate: () => {},
};
export default TodoItem;
