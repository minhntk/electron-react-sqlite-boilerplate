import { combineReducers } from 'redux';
import todoReducers from './todoReducers';
import projectReducers from './projectReducers';

const todoApp = combineReducers({
  todoListState: todoReducers,
  projectState: projectReducers,
});

export default todoApp;
