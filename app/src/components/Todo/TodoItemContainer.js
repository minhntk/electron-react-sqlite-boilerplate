import React from 'react';
import PropTypes from 'prop-types';
import TodoItemView from './TodoItemView';

export default class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onDrag = this.onDrag.bind(this);
  }

  onDrag = (item) => (event) => {
    event.preventDefault();
    console.log(item);
  }

  render() {
    const { todoItem } = this.props;
    return (
      <TodoItemView todoItem={todoItem}  />
    );

  }
}

TodoContainer.propTypes = {
  todoItem: PropTypes.object
};
