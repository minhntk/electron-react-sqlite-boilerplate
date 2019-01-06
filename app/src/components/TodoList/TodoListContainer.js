import React from 'react';
import TodoListView from './TodoListView';
import { connect } from 'react-redux';
import ModalComponent from '../Modal/ModalComponent';
import { displayTodoForm } from '../../actions/todoActions';
import PropTypes from 'prop-types';
import TodoService from '../../service/TodoService';
import StatusService from '../../service/StatusService';

class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.openTodoForm = this.openTodoForm.bind(this);
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragOver = this.handleOnDragOver.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
  }

  state = {
    todos: [],
    draggedItem: null
  }

  async componentDidMount() {
    // console.log(this.props);
    // const { statusItem } = this.props;
    // let todoItems = await TodoService.getTodoItemsByProjectAndStatus(statusItem.statusId);
    // this.setState({
    //   todos: todoItems
    // });
  }

  handleOnDragOver(event) {
    // event.preventDefault();
    // event.dataTransfer.dropEffect = 'move';
    // console.log('handleOnDragOver');
    //console.log(e);
  }

  handleOnDrop = (statusItem) => async (event) => {
    // event.preventDefault();
    // const updateTodoId = event.dataTransfer.getData('todoId');
    // console.log('onDrop', updateTodoId);
    // await TodoService.updateTodoItem(statusItem.statusId, updateTodoId);
    // let todoItems = await TodoService.getTodoItemsByProjectAndStatus(statusItem.statusId);
    // this.setState({
    //   todos: todoItems,
    //   draggedItem: null
    // });
  }

  openTodoForm() {
    this.props.dispatch(displayTodoForm(true));
  }

  handleOnDragEnd = (statusItem) => async (event) => {
    // let todoItems = await TodoService.getTodoItemsByProjectAndStatus(statusItem.statusId);
    // this.setState({
    //   todos: todoItems,
    //   draggedItem: null
    // });
  }

  handleOnDragStart = (item, statusItem) => async (event) => {
    // event.dataTransfer.setData('todoId', item.todoId);
    // event.dataTransfer.dropEffect = 'move';
    // let todoItems = await TodoService.getTodoItemsByProjectAndStatus(statusItem.statusId);
    // this.setState({
    //   todos: todoItems,
    //   draggedItem: null
    // });

  }

  render() {
    return (
      <React.Fragment>
        <ModalComponent />
        <TodoListView
          onDragOver={this.handleOnDragOver}
          todoItems={this.props.todoItems}
          statusItem={this.props.statusItem}
          openTodoForm={this.openTodoForm}
          handleOnDrop={this.handleOnDrop}
          handleOnDragStart={this.handleOnDragStart}
          handleOnDragOver={this.handleOnDragOver}
          handleOnDrag={this.handleOnDrag}
          handleOnDragEnd={this.handleOnDragEnd}
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
  dispatch: PropTypes.func,
  statusItem: PropTypes.object,
  todoItems: PropTypes.array
};

export default connect(mapStateToProps)(TodoListContainer);
