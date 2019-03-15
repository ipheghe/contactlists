import { Contact } from '../models';
import {
  handleErrorMessage,
  handleSuccessMessage,
} from '../utils/messageHandler';

/**
 * @description Contact controller that houses different methods
 *
 * @return {void} null
 */
export default class ContactController {
  /**
   * @description controller function that handles creation of new contact account
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static createContact(req, res) {
    const {
      name,
      phoneNumbers,
      imageUrl
    } = req.body;

    const phoneNumberList = [];

    if (name === '') {
      return handleErrorMessage(res, 400, 'name field cannot be empty');
    }

    if (phoneNumbers === '' || phoneNumbers.length < 11) {
      return handleErrorMessage(res, 400, 'phone numbers field cannot be empty');
    }

    const updatedPhoneNumbers = phoneNumbers.split(',');
    updatedPhoneNumbers && updatedPhoneNumbers.map(phoneNumber => {
      if (!parseInt(phoneNumber)) {
        return handleErrorMessage(res, 400, 'one or more phone number is invalid');
      }
      phoneNumberList.push(phoneNumber);
    })

    return Contact.findOne({
      where: { phoneNumbers: {
        $overlap: phoneNumberList
      } },
    }).then((existingContact) => {
      if (existingContact) {
        return handleErrorMessage(res, 409, 'Phone number you entered already exist');
      }

      Contact.create({
        name: name.trim(),
        phoneNumbers: phoneNumberList,
        imageUrl: imageUrl ? imageUrl : 'https://pbs.twimg.com/profile_images/59577478/John_avatar_400x400.jpg'
      })
        .then((contact) => {
          const contactData = {
            id: contact.id,
            name: contact.name,
            phoneNumbers: contact.phoneNumbers,
          };
          handleSuccessMessage(res, 201, contactData, 'Contact account successfully created.');
        })
        .catch((error) => {
          const errorMessage = error.errors.map(value => value.message);
          handleErrorMessage(res, 400, errorMessage);
        });
    })
    .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description controller function that searches for
   * contacts by name or phone number
   * 
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   * @return {object} message recipes
   */
  static searchContacts(req, res, next) {

    // If query key does not match name or phone number, call next on the next handler
    if (!req.query.search) return next();

    // if multiple keywords are present, split by the comma
    const search = req.query.search.split(',');

    // collects the keyword and searches if it is present
    // in name or phoneNumbers
    const query = search.map(word => ({
      phoneNumbers: {
        $overlap:  parseInt(word) ? [word] : [null]
      }
    }));
    const query1 = search.map(word => ({
      name: {
        $iLike: `%${word}%`
      }
    }));

    return Contact
      .findAll({
        where: {
          $or: [
            {
              $or: query
            },
            {
              $or: query1
            }
          ]
        },
      })
      .then((contacts) => {
        if (contacts.length === 0) {
          return res.status(200).send({
            message: 'Sorry!!! No contact matches your search'
          });
        }
        return handleSuccessMessage(res, 200, contacts, 'Search result retrieved successfully!')
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  }

  /**
   * @description Get all contacts
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static getAllContacts(req, res) {
    const convertArrayToCSV = (args) => {  
      let result, ctr, keys, columnDelimiter, lineDelimiter, data;

      data = args.data || null;
      if (data == null || !data.length) {
          return null;
      }

      columnDelimiter = args.columnDelimiter || ',';
      lineDelimiter = args.lineDelimiter || '\n';

      keys = Object.keys(data[0]);

      result = '';
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      data.forEach(function(item) {
          ctr = 0;
          keys.forEach(function(key) {
              if (ctr > 0) result += columnDelimiter;

              result += item[key];
              ctr++;
          });
          result += lineDelimiter;
      });

      return result;
    }
    
    return Contact.findAll()
      .then(contacts => {
        const csvFile = convertArrayToCSV({ data: contacts });
        return handleSuccessMessage(res, 200, contacts, 'All contacts retrieved successfully.', csvFile)
      })
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
       return  handleErrorMessage(res, 400, errorMessage);
      })
      .catch((err) => handleErrorMessage(res, 500, err));
  }
}
