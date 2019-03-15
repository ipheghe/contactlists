// actions
import {
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  GET_ALL_CONTACTS_REQUEST,
  GET_ALL_CONTACTS_SUCCESS,
  GET_ALL_CONTACTS_FAILURE
} from './constants';

// config
import http from '../config/http';

/**
 * createContactSuccess - Dispatch create contact action
 *
 * @param   {object} data - content of the response
 * @returns {object} - an object containing the type and payload
 */
export const createContactSuccess = (data) => ({
  type: CREATE_CONTACT_SUCCESS,
  data,
});

/**
 * createContactFailure - Dispatch error mesaage on failure to create contact
 *
 * @param {object} error - error object
 * @returns {object} - an object containing the type and payload
 */
export const createContactFailure = (error) => ({
  type: CREATE_CONTACT_FAILURE,
  error,
});

/**
 * publishWebsite - dispatches the request to publish webssite
 *
 * @param {string}    websiteId - Id of the current website
 * @param {function}  dispatch - dispatch method
 * @returns {function} - disapatch method depending on http response
 */
export const createContact = (payload) => (dispatch) => {
  dispatch({ type: CREATE_CONTACT_REQUEST });
  return http.post(`/api/v1/contact/`, payload)
    .then(response => dispatch(createContactSuccess(response.data)))
    .catch((error) => {
      const data = {
        errorMessage: error.response ? error.response.statusText : '',
        errorCode: error.response ? error.response.status : '',
        errorStatus: true,
      };
      return dispatch(createContactFailure(data));
    });
};

/**
 * getContactsSuccess - Dispatch get all contacts
 *
 * @param {array} pages - data contains data to dispatch
 * @returns {object} - an object containing payload
 */
export const getContactsSuccess = (data) => (
  {
    type: GET_ALL_CONTACTS_SUCCESS,
    data,
  }
);

/**
 * getContactsFailure - Dispatch error message on failure to get contacts
 *
 * @param {object} error - error contains error message, status and code
 * @returns {object} - an object containing payload
 */
export const getContactsFailure = (error) => (
  {
    type: GET_ALL_CONTACTS_FAILURE,
    error,
  }
);

/**
 * getPages - Dispatch pages after successfully fetching it
 *
 * @param {string} siteId - Id of the current site
 * @param {function} dispatch - dispatch method
 * @returns {function} - disapatch method depending on http response
 */
export const getAllContacts = (query = null) => (dispatch) => {
  console.log('ugttttttkkkkkkkkkkkkkkkkmmmmtt')
  dispatch({ type: GET_ALL_CONTACTS_REQUEST });
  const searchQuery = query ? '?search=query' : '';
  return http.get(`/api/v1/contact${searchQuery}`)
    .then(response => {
      console.log(response, '====hdhd')
      return dispatch(getContactsSuccess(response.data.data))
    })
    .catch((error) => {
      const data = {
        errorMessage: error.response ? error.response.statusText : '',
        errorCode: error.response ? error.response.status : '',
        errorStatus: true,
      };
      return dispatch(getContactsFailure(data));
    });
}



