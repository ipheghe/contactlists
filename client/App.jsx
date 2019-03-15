// react imports
import React, { Component } from 'react';
import { Provider } from 'react-redux'

// components
import Dashboard from './containers/Dashboard';
import store from './store';


/**
 * Container component housing the Single-Page application
 *
 * @class App
 */
export default class App extends Component {

  /**
   * Renders App component
   *
   * @returns {JSX} jsx
   * @memberof App
   */
  render() {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  }
}
