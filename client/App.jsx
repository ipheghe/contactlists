// react imports
import React, { Component } from 'react';
import { Router } from "@reach/router";
import { Provider } from 'react-redux'

// components
import Dashboard from './containers/Dashboard';
import Form from './containers/Form';
import Header from './components/Header';
import Footer from './components/Footer';

// store
import configureStore from './store';


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
      <Provider store={configureStore}>
        <Header />
        <Router>
          <Dashboard path="/" />
          <Form path="/contact" />
        </Router>
        <Footer />
      </Provider>
    );
  }
}
