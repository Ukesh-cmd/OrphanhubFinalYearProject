import React from 'react';

const HighestAgeViewCard = ({ highestAgeChild, calculateAge }) => {
  const childAge = calculateAge(highestAgeChild.date_of_birth);

  return (
    <div className="highest-age-card">
      <div className="child-card">
        <div className="child-picture">
          <img
            src={highestAgeChild.picture || 'profilepic.jpg'}
            alt="Child Picture"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '50%',
              marginTop: '10px',
              marginBottom: '10px',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
        <div className="child-details">
          <h2 id="childName">{highestAgeChild.name}</h2>
          <p id="childAge">Age: {childAge}</p>
          <p id="childGender">Gender: {highestAgeChild.gender}</p>
          <button disabled>Sponsor</button>
        </div>
      </div>
    </div>
  );
};

export default HighestAgeViewCard;