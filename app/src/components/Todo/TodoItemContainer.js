import React from 'react';
import TodoItemView from './TodoItemView';

export default class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TodoItemView />;
  }
}
