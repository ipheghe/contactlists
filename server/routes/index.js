import express from 'express';
import ContactController from '../controllers/contacts';
// import {
//   validateContactFields,
//   isContactValid,
// } from '../middlewares/contactValidation';

const contactRoute = express.Router();

// API route to create contact
contactRoute
  .post('/api/v1/contact', ContactController.createContact);

// API route to get all contacts
contactRoute.get('/api/v1/contact', ContactController.searchContacts, ContactController.getAllContacts);

export default contactRoute;
