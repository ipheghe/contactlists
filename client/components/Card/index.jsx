import React from 'react';
import './Card.scss';

const Card = ({ name, phoneNumbers}) => {
   return (
    <div class="card">
      <img src="img_avatar.png" alt="Avatar" style="width:100%" />
      <div class="container">
        <h4><b>{name}</b></h4> 
        <p>Architect & Engineer</p> 
      </div>
    </div>
   );
}

export default Card;
