import React from 'react';
import TodoItemContainer from '../Todo/TodoItemContainer';
import '../../styles/css/todo.scss';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const TodoListView = props => {
  const { todoItems, statusItem } = props;
  return (
    <div
      onDragOver={props.handleOnDragOver}
      onDrop={props.handleOnDrop(statusItem)}
    >
      <div className="todo-list-container__title" style={{ color: `${statusItem.color}` }}>
        {statusItem.text}
      </div>
      {todoItems.map((item, index) => (
        <Draggable
          key={item.todoId}
          draggableId={item.todoId}
          index={index}>
          {(provided, snapshot) => {
            const style = {
              opacity: snapshot.isDragging ?  0.3 : 1,
              ...provided.draggableProps.style,
            };
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                // key={item.todoId}
                className="todo-list-container__item"
                style={style}
                // draggable
                // onDragStart={props.handleOnDragStart(item, statusItem)}
                // onDragEnd={props.handleOnDragEnd(statusItem)}
                //onDrag={props.handleOnDrag(item)}
              >
                <TodoItemContainer todoItem={item} statusItem={statusItem} />
              </div>
            );
          }}
        </Draggable>

      ))}
    </div>
  );
};

TodoListView.propTypes = {
  todoItems: PropTypes.array,
  handleOnDrop: PropTypes.func,
  handleOnDragStart: PropTypes.func,
  handleOnDrag: PropTypes.func,
  openTodoForm: PropTypes.func,
  statusItem: PropTypes.object,
  handleOnDragOver: PropTypes.func,
  handleOnDragEnd: PropTypes.func
};

export default TodoListView;
