import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoListContainer from './components/TodoList/TodoListContainer';
import { Provider } from 'react-redux';
import store from './configureStore';
import Modal from 'react-modal';

Modal.setAppElement('#root');
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
			<Provider store={store}>
			<TodoListContainer />
		</Provider>
    );
  }
}

export default App;
