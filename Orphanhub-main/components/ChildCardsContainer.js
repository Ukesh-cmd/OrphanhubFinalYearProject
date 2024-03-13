// ChildCardsContainer.js

import React from 'react';

import ChildCardMaker from './ChildCardmaker';
const ChildCardsContainer = ({ childCards, isAdmin, onAdopt, onSponsor, onEdit }) => {
  return (
    <div className="child-cards-container">
      {childCards.map((child) => (
        <ChildCardMaker
          key={child.id}
          data={child}
          isAdmin={isAdmin}
          onAdopt={onAdopt}
          onSponsor={onSponsor}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ChildCardsContainer;
