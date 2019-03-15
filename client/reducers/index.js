import { combineReducers } from 'redux';
import {
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  GET_ALL_CONTACTS_REQUEST,
  GET_ALL_CONTACTS_SUCCESS,
  GET_ALL_CONTACTS_FAILURE,
  SEARCH_ALL_CONTACTS_SUCCESS,
  
} from '../actions/constants';

const initialState = {
  contacts: {
    data: [],
    search: [],
    error: {},
    pending: false,
  }
}

const contactReducer = (state = initialState.contacts, action) => {
  switch (action.type) {
  case CREATE_CONTACT_SUCCESS:
    return {
      ...state,
      pending: false,
      data: [ ...state.data, action.data],
      error: {},
    };
  case CREATE_CONTACT_REQUEST:
    return {
      ...state,
      pending: true,
    };
  case CREATE_CONTACT_FAILURE:
    return {
      ...state,
      pending: false,
      error: action.error,
    };

  case GET_ALL_CONTACTS_SUCCESS:
    return {
      ...state,
      pending: false,
      data: action.data,
      error: {},
      search: []
    };

  case SEARCH_ALL_CONTACTS_SUCCESS:
    return {
      ...state,
      pending: false,
      search: action.data,
      error: {},
      data: [],
    };

  case GET_ALL_CONTACTS_REQUEST:
    return {
      ...state,
      pending: true,
    };
  case GET_ALL_CONTACTS_FAILURE:
    return {
      ...state,
      pending: false,
      error: action.error,
    };

  default:
    return state;
  }
};

const combinedReducers = combineReducers({
  contacts: contactReducer,
});

export default combinedReducers;
