import React from 'react';
import TodoListView from './TodoListView';
import { connect } from 'react-redux';
import ModalComponent from '../Modal/ModalComponent';
import { displayTodoForm } from '../../actions/todoActions';
import PropTypes from 'prop-types';
import TodoService from '../../service/TodoService';

class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.openTodoForm = this.openTodoForm.bind(this);
    this.handleOnDrag = this.handleOnDrag.bind(this);
    //TodoService.autoAddTodoItems();
  }

  state = {
    todos: []
  }

  async componentDidMount() {
    let todoItems = await TodoService.getTodoItemsByProject();
    this.setState({
      todos: todoItems
    });
  }

  handleOnDrop(e) {
    console.log(e);
  }

  openTodoForm() {
    console.log('dispatch');
    this.props.dispatch(displayTodoForm(true));
  }

  handleOnDrag = (item) => (event) => {
    event.preventDefault();
    //console.log(item);
  }

  render() {
    const { todos } = this.state;
    return (
      <React.Fragment>
        <ModalComponent />
        <TodoListView
          todoItems={todos}
          openTodoForm={this.openTodoForm}
          handleOnDrop={this.handleOnDrop}
          handleOnDrag={this.handleOnDrag}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  todoListState: store.todoListState,
  itemTypes: store.todoListState.types,
});

TodoListContainer.propTypes = {
  itemTypes: PropTypes.array,
  dispatch: PropTypes.func
};

export default connect(mapStateToProps)(TodoListContainer);
