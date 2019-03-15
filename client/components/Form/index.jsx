import React from 'react';
import './Form.scss';

const Form = ({ name, pNumbers, error, onSubmit}) => {

  return (
    <div className="form__container">
      <form onSubmit={onSubmit}>
        {error && <P>{error}</P>}
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Name"  value={name}/>

        <label for="pNumbers">Phone Numbers:</label>
        <input
          type="textarea"
          id="pNumbers"
          name="pNumbers"
          value={pNumbers}
          placeholder="Phone Numbers(Use comma to separte phone numbers if more than one)"
        />
      
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Form;
