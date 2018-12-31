import { ADD_TODO_ITEM, DISPLAY_TODO_FORM } from '../appConstants';

const initialState = {
  todoItemsList: [],
  types: ['TODO', 'IN PROGRESS', 'DONE'],
};

const todoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_ITEM:
      return {
        ...state,
        arr: [...state.todoItemsList, action.todoItem],
      };
    case DISPLAY_TODO_FORM:
      return Object.assign({}, state, {
        isOpenModal: action.isOpenModal,
      });
    default:
      return state;
  }
};

export default todoReducers;
