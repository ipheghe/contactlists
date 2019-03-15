import React, { Component } from 'react';

// third-party libraries import
import { connect } from 'react-redux';
import { navigate } from "@reach/router";

// styles
import './Form.scss';

import { createContact } from '../../actions'

class Form extends Component {
  state = {
    name: '',
    pNumbers: '',
    error: '',
    success: ''
  }

  /**
   * This method handles number input change event
   *
   * @param {event} event - Sythentic event
   * @return {void}  null
   */
  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { pNumbers, name } = this.state; 

    if (name === '') {
      this.setState({ error: 'Name field cannot be left empty' })
    } else if (pNumbers === '') {
      this.setState({ error: 'phoneNumber field cannot be left empty' })
    } else if (pNumbers.length < 11) {
      this.setState({ error: 'phoneNumber must have more than 10 digits' })
    } else {
      this.props.createContact({ name, phoneNumbers: pNumbers });
    }

    if (this.props.contacts.length > 0) {
      this.setState({ success: 'Contact Created Successfully'});
      setTimeout(() => {
        this.setState({
          success: ''
        });
      }, 10000);
      navigate("/");
    } else {
      setTimeout(() => {
        this.setState({
          error: ''
        });
      }, 10000);
    }
  }

  render() {
    const { pNumbers, name, error, success } = this.state;
    const { contacts } = this.props;
    return (
      <div className="form__container">
        {success && <p className="success__text">{success}</p>}
        <form onSubmit={this.handleSubmit}>
          {error && <p className="error__text">{error}</p>}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name:"
            onChange={this.handleChange}
            value={name}
            required
          />
  
          <label htmlFor="pNumbers">Phone Numbers:</label>
          <textarea
            rows="10"
            id="pNumbers"
            name="pNumbers"
            value={pNumbers}
            onChange={this.handleChange}
            placeholder="Phone Numbers(Use comma to separte phone numbers if more than one)"
            required
          />
        
          <input type="submit" value={contacts.pending ? 'Submitting' : 'Submit'} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ contacts }) => ({ contacts });

export default connect(mapStateToProps, { createContact })(Form);
