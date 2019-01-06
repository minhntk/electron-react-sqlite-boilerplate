import React from 'react';
import PropTypes from 'prop-types';
import TodoItemView from './TodoItemView';

export default class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoItem, statusItem } = this.props;
    return (
      <TodoItemView todoItem={todoItem} statusItem={statusItem} />
    );
  }
}

TodoContainer.propTypes = {
  todoItem: PropTypes.object,
  statusItem: PropTypes.object
};
