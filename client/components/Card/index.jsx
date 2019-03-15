import React from 'react';
import './Card.scss';

const Card = ({ name, phoneNumbers}) => {
   return (
    <div className="card">
      <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style={{ width: '100%'}} />
      <div className="container">
        <h4><b>{name}</b></h4> 
        <ul>
          {phoneNumbers && phoneNumbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul> 
      </div>
    </div>
   );
}

export default Card;
