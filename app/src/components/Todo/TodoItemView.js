import React from 'react';
import PropTypes from 'prop-types';

const TodoItemView = props => (
  <div className="todo-item-card">
    <div className="title">{props.todoItem.title}</div>
    <div className="title">{props.todoItem.description}</div>
  </div>
);

TodoItemView.propTypes = {
  todoItem: PropTypes.object,
  onDrag: PropTypes.func,
  title: PropTypes.string
};

export default TodoItemView;
