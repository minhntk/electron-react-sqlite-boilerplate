import React from 'react';
import TodoItemContainer from '../Todo/TodoItemContainer';
import '../../styles/css/todo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const TodoListView = props => {
  const { todoItems } = props;
  return (
    <div className="container" onDrop={props.handleOnDrop}>
      {todoItems.map(item => (
        <div
          key={item.todoId}
          className="todo-list-container"
          draggable
          onDrag={props.handleOnDrag(item)}
        >
          <TodoItemContainer todoItem={item} />
        </div>
      ))}
      <div>
        <button onClick={props.openTodoForm}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add Todo Item
        </button>
      </div>
    </div>
  );
};

TodoListView.propTypes = {
  todoItems: PropTypes.array,
  handleOnDrop: PropTypes.func,
  handleOnDrag: PropTypes.func,
  openTodoForm: PropTypes.func
};

export default TodoListView;
