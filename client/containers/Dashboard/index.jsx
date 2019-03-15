// react imports
import React, { Component } from 'react';

// third-party libraries import
import { connect } from 'react-redux';
import _ from 'lodash';
import { CSVLink } from 'react-csv';

// styles
import './Dashboard.scss';

// components
import CardList from '../../components/CardList';

// actions
import { getAllContacts } from '../../actions'

/**
 * Container component housing the Single-Page application
 *
 * @class Dashboard
 */
export class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contactData: [],
      errorMessage: '',
      name: '',
      pNumbers: '',
      search: '',
    };
  }

  componentDidMount() {
    this.props.getAllContacts();
  }

  /**
   * React component life cycle hook
   *
   * @memberof Dashboard
   * @param {object} props - Props
   * @param {object} state - State
   * @return {void} - no return
   */
  static getDerivedStateFromProps = (props, state) => {
    const { contacts } = props;
    const { contactData } = state;
    if (contacts.search && contacts.search.length > 0 && contactData !== contacts.search) {
      return {
        contactData: contacts.search
      }
    }
    if (contacts.data && contacts.data.length > 0 && contactData !== contacts.data) {
      return {
        contactData: contacts.data,
      };
    }


    return state;
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

  renderContactCards = () => {
    const { contactData } = this.state;

    if (contactData && contactData.length < 1) {
      return (
        <h3>No Contact Available Yet</h3>
      )
    }

    return (
      <CardList cards={contactData} />
    );
  }

  handleSearch = (event) => {
    event.preventDefault();
    const { search } = this.state;

    if (search !== '') {
      this.props.getAllContacts(search);
    }
  }

  /**
   * Renders Dashboard component
   *
   * @memberof Dashboard
   * @returns {JSX} jsx
   */
  render() {
    const { contacts } = this.props;
    const { search } = this.state;

    return (
      <div className="container">
        <div className="search-container">
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              value={search}
              onChange={this.handleChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {contacts.pending ? (
          <p>Loading......</p>
        ) : this.renderContactCards()}
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({ contacts });

export default connect(mapStateToProps, { getAllContacts })(Dashboard);
