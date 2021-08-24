/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';
import './TodoContainer.css';

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    const temp = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    console.log(prevProps);
    if (prevState.todos !== todos) {
      const temp = JSON.stringify(todos);
      localStorage.setItem('todos', temp);
    }
  }

    handleChange = (id) => {
      const { todos } = this.state;
      this.setState({
        todos: todos.map((todo) => {
          const result = todo;
          if (todo.id === id) {
            result.completed = !todo.completed;
          }
          return result;
        }),
      });
    };

      delTodo = (id) => {
        const { todos } = this.state;
        this.setState({
          todos: [
            ...todos.filter((todo) => todo.id !== id),
          ],
        });
      };

      addTodoItem = (title) => {
        const { todos } = this.state;
        const newTodo = {
          id: uuidv4(),
          title,
          completed: false,
        };
        this.setState({
          todos: [...todos, newTodo],
        });
      };

      setUpdate = (updatedTitle, id) => {
        const { todos } = this.state;
        this.setState({
          todos: todos.map((todo) => {
            if (todo.id === id) {
              const result = todo;
              result.title = updatedTitle;
              return result;
            }
            return todo;
          }),
        });
      }

      render() {
        const { todos } = this.state;
        return (
          <div className="container">
            <div className="inner">
              <Header />
              <InputTodo addTodoProps={this.addTodoItem} />
              <TodosList
                todos={todos}
                handleChangeProps={this.handleChange}
                deleteTodoProps={this.delTodo}
                setUpdate={this.setUpdate}
              />
            </div>
          </div>
        );
      }
}

export default TodoContainer;
