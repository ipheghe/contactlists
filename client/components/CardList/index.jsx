import React from 'react';
import Card from '../Card'
import './CardList.scss';

const CardList = ({ cards }) => {
   return (
     <div className="card__list__container">
       { cards && cards.map(card => (
         <Card
          key={card.id}
          name={card.name}
          phoneNumbers={card.phoneNumbers}
         />
       ))}
     </div>
   )
}

export default CardList;
