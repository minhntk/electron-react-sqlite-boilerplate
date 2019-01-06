import React from 'react';
import { connect } from 'react-redux';
import ModalComponent from '../Modal/ModalComponent';
import { displayTodoForm } from '../../actions/todoActions';
import PropTypes from 'prop-types';
import StatusService from '../../service/StatusService';
import TodoService from '../../service/TodoService';
import TodoListContainer from '../TodoList/TodoListContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    //TodoService.autoAddTodoItems();
    //StatusService.autoStatusItems();
    this.openTodoForm = this.openTodoForm.bind(this);
    this.handleonDragEnd = this.handleonDragEnd.bind(this);
  }

  state = {
    statusItems: [],
    todoItems: []
  }

  async componentDidMount() {
    let statusItems = await StatusService.getStatusItemsByProject();
    let todoItems = await TodoService.getTodoItemsByProject();
    this.setState({
      statusItems,
      todoItems
    });
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  openTodoForm() {
    this.props.dispatch(displayTodoForm(true));
  }

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };


  async handleonDragEnd(result) {
    const { source, destination, draggableId } = result;
    let { todoItems } = this.state;
    let index = 0;
    // console.log(draggableId);
    // console.log(source);
    // console.log(destination);
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const listOfTodos = todoItems.filter(todoItem => todoItem.statusId == source.droppableId);
      let reorderTodoList = this.reorder(listOfTodos, source.index, destination.index);
      //console.log('reorder', reorderTodoList);
      for (let todoItem of reorderTodoList) {
        await TodoService.updateOrderOfTodoItem(todoItem.todoId, index);
        index = index + 1;
      }
      let newTodoItems = await TodoService.getTodoItemsByProject();
      this.setState({
        todoItems: newTodoItems
      });
    } else {
      if (destination.droppableId) {
        let sourceList = todoItems.filter(item => item.statusId == source.droppableId);
        let destList = todoItems.filter(item => item.statusId == destination.droppableId);
        let result = this.move(
          sourceList,
          destList,
          source,
          destination
        );
        TodoService.updateTodoItem(destination.droppableId, draggableId);
        for (let todoItem of result[destination.droppableId]) {
          await TodoService.updateOrderOfTodoItem(todoItem.todoId, index);
          index = index + 1;
        }
        let newTodoItems = await TodoService.getTodoItemsByProject();
        this.setState({
          todoItems: newTodoItems
        });
        // updateTodoItem[0].statusId = destination.droppableId;
        // TodoService.updateTodoItem(destination.droppableId, draggableId);
        // await TodoService.updateOrderOfTodoItem(updateTodoItem[0].todoId, destination.index);
        // let newTodoItems = await TodoService.getTodoItemsByProject();
        // this.setState({
        //   todoItems: newTodoItems
        // });
      }
    }

  }

  render() {
    console.log('render');
    const { statusItems, todoItems } = this.state;
    let listOfTodoContainer = statusItems.map(item => {
      const todos = todoItems.filter(todoItem => todoItem.statusId == item.statusId);
      return (
        <Droppable key={item.statusId} droppableId={item.statusId}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef}
              className="todo-list-container"
            >
              <TodoListContainer
                statusItem={item}
                todoItems={todos}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );
    });
    return (
      <div className="dashboard-container">
        <ModalComponent />
        <DragDropContext onDragEnd={this.handleonDragEnd}>
          {listOfTodoContainer}
        </DragDropContext>
        <div>
          <button onClick={this.openTodoForm}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Todo Item
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  todoListState: store.todoListState,
  itemTypes: store.todoListState.types,
});

DashboardContainer.propTypes = {
  itemTypes: PropTypes.array,
  dispatch: PropTypes.func
};

export default connect(mapStateToProps)(DashboardContainer);
