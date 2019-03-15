import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../app';
import { Contact } from '../models';

const server = supertest.agent(app);

const doBeforeAll = () => {
  before((done) => {
    Contact.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    done();
  });
};

describe('<<< Contact Controller: ', () => {
  doBeforeAll();
  
  describe('Create Contact: ', () => {
    it('should return an error message for null name field', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: '',
          phoneNumbers: '2348023451234',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('name field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for null phone number field', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Emeka',
          phoneNumbers: null,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('phone numbers field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return message for successful account creation with single phone Number', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Emeka',
          phoneNumbers: '08023457734',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Contact account successfully created.');
          if (err) return done(err);
          done();
        });
    });

    it('should return message for successful account creation with multiple phone numbers', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Esther',
          phoneNumbers: '08033334444, 07011112222',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Contact account successfully created.');
          if (err) return done(err);
          done();
        });
    });

    it('should not create user with same phone number twice', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Kenedy',
          phoneNumbers: '08033334444, 2347011112222',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Phone number you entered already exist');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error for invalid phone number', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Ese',
          phoneNumbers: 'aaaaaaaaa23aaaaa4466666666',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('one or more phone number is invalid');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get All Contacts: ', () => {
    it('should return all contacts', (done) => {
      server
        .get('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All contacts retrieved successfully.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Search Contacts: ', () => {
    it('should return all searched contacts successfully', (done) => {
      server
        .get('/api/v1/contact?search=ben,08023457734')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Search result retrieved successfully!');
          expect(res.body.contacts.length).to.equal(1);
          if (err) return done(err);
          done();
        });
    });

    it('should return message when search result is not found', (done) => {
      server
        .get('/api/v1/contact?search=angela')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Sorry!!! No contact matches your search');
          if (err) return done(err);
          done();
        });
    });

    it('should return all searched contacts successfully', (done) => {
      server
        .get('/api/v1/contact?search=Emeka')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Search result retrieved successfully!');
          expect(res.body.contacts.length).to.equal(1);
          if (err) return done(err);
          done();
        });
    });
  });
});
