import { DISPLAY_TODO_FORM } from '../appConstants';

const initialState = {
  isOpenModal: false,
};

const projectReducers = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_TODO_FORM:
      return Object.assign({}, state, {
        isOpenModal: action.isOpenModal,
      });
    default:
      return state;
  }
};

export default projectReducers;
