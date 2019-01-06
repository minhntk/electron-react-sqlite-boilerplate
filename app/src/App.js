import React, { Component } from 'react';
import DashboardContainer from './components/Dashboard/DashboardContainer';
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
        <DashboardContainer />
      </Provider>
    );
  }
}

export default App;
