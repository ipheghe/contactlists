import React from 'react';
import Card from '../Card'

const CardList = ({ cards }) => {
  console.log(cards)
   return (
     <div>
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
