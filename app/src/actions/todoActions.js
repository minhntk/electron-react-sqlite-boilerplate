import { ADD_TODO_ITEM, DISPLAY_TODO_FORM } from '../appConstants';

export function addTodoItem(todoItem) {
  return {
    type: ADD_TODO_ITEM,
    todoItem,
  };
}

export function displayTodoForm(isOpenModal) {
  return {
    type: DISPLAY_TODO_FORM,
    isOpenModal,
  };
}
