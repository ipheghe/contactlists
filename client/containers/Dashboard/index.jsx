// // react imports
// import React, { Component } from 'react';

// // third-party libraries import
// import { connect } from 'react-redux';
// import _ from 'lodash';
// import { CSVLink } from 'react-csv';

// // styles
// import './Dashboard.scss';

// // components
// import CardList from '../../components/CardList';
// import Form from '../../components/Form';

// import { getAllContacts, CreateContact } from '../../actions'

// /**
//  * Container component housing the Single-Page application
//  *
//  * @class Dashboard
//  */
// export class Dashboard extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       contactData: [],
//       errorMessage: '',
//       data: [],
//       name: '',
//       pNumbers: '',
//     };
//   }


//   componentDidMount() {
//     this.props.getAllContacts();
//   }

//   /**
//    * React component life cycle hook
//    *
//    * @memberof Dashboard
//    * @param {object} props - Props
//    * @param {object} state - State
//    * @return {void} - no return
//    */
//   static getDerivedStateFromProps = (props, state) => {
//     const { contacts } = props;
//     console.log(contacts, 'pppppp', state, '======kkkkkkkkkk')
//     const { contactData } = state;
//     if (contactData !== contacts.data && contacts.data.length > 0) {
//       return {
//         contactData: contacts.data,
//       };
//     }

//     return state;
//   }

//   // /**
//   //  * This method validates input field after submitting
//   //  *
//   //  * @return {void}  null
//   //  */
//   // validateField = () => {
//   //   const { name, phoneNumbers } = this.state;
//   //   if (name === '') {
//   //    this.setState({ errorMessage: 'Name field cannot be empty '});
//   //    return false;
//   //   }
//   //   if (pNumbers === '') {
//   //     this.setState({ errorMessage: 'phone numbers field cannot be empty '});
//   //     return false;
//   //    }

//   //   return true;
//   // };

//   // /**
//   //  * This method handles number input change event
//   //  *
//   //  * @param {event} event - Sythentic event
//   //  * @return {void}  null
//   //  */
//   // handleChange = event => {
//   //   event.preventDefault();
//   //   this.setState({
//   //     [event.target.name]: event.target.value,
//   //   });
//   // };

//   // /**
//   //  * This method handles text button Click to generate numbers
//   //  *
//   //  * @param {event} event - Sythentic event
//   //  * @return {void}  null
//   //  */
//   // handleButtonClick = event => {
//   //   event.preventDefault();
//   //   this.setState(
//   //     {
//   //       buttonText: 'Generating Numbers.....',
//   //     },
//   //     () => this.updateGeneratedNumbers()
//   //   );
//   // };

//   renderContactCards = () => {
//     const { contactData } = this.state;
//     const { contacts } = this.props
//     console.log(contactData, '===rege')

//     if (contacts.data.length < 1) {
//       return (
//         <h3>No Contact Available Yet</h3>
//       )
//     }

//     return (
//       <CardList cards={contacts.data} />
//     );
//   }

//   /**
//    * Renders Dashboard component
//    *
//    * @memberof Dashboard
//    * @returns {JSX} jsx
//    */
//   render() {
//     const { contacts } = this.props;

//     return (
//       <div className="container">
//         {contacts.pending ? (
//           <p>Loading......</p>
//         ) : this.renderContactCards()}
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ contacts }) => ({ contacts });

// export default connect(mapStateToProps, { getAllContacts, CreateContact })(Dashboard);
