// import React, { useState } from 'react';
// import AdoptionForm from './AdoptionForm';
// import SponsorForm from './SponsorForm';

// const ChildCardMaker = ({ selectedChild, onBackButtonClick }) => {
//   const [showAdoptionForm, setShowAdoptionForm] = useState(false);
//   const [showSponsorForm, setShowSponsorForm] = useState(false);

//   const handleAdoptButtonClick = () => {
//     setShowAdoptionForm(true);
//   };

//   const handleSponsorButtonClick = () => {
//     setShowSponsorForm(true);
//   };

//   return (
//     <div className="child-card-container">
//       <div className="child-card">
//         <button onClick={onBackButtonClick} className="back-arrow-button">
//           &#8592; Back
//         </button>
//         <div className="child-picture">
//         <img
//   src={selectedChild.picture || 'profilepic.jpg'}
//   alt="Child Picture"
//   style={{
//     maxWidth: '100%',  
//     height: 'auto',    
//     borderRadius: '50%', 
//     marginTop: '10px',    
//     marginBottom: '10px', 
//     boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', 

//     '@media (max-width: 600px)': {
//       maxWidth: '80%',  
//       borderRadius: '0%', 
//     }
//   }}
// />

//         </div>
//         <div className="child-details">
//         <h2 id="childName">{selectedChild.name}</h2>
//           <p id="childAge">Age: {selectedChild.age}</p>
//           <p id="childGender">Gender: {selectedChild.gender}</p>
//           <p id="childHealthConditions">Health Conditions: {selectedChild.additional_details}</p>
//           <p id="childPersonality">Personality: {selectedChild.hobbies}</p>
//           <div className="child-buttons">
//             <button id="adoptButton" onClick={handleAdoptButtonClick}>
//               Adopt
//             </button>
//             <button id="sponsorButton" onClick={handleSponsorButtonClick}>
//               Sponsor
//             </button>
//           </div>
//         </div>
//       </div>

//       {showAdoptionForm && <AdoptionForm />}
//       {showSponsorForm && <SponsorForm />}
//     </div>
//   );
// };

// export default ChildCardMaker;


import React, { useState } from 'react';

import CheckoutForm from './CheckoutForm';
import SponsorshipForm from './SponsorForm'; 
 
const ChildCardMaker = ({ selectedChild, onBackButtonClick, calculateAge }) => {
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // State to toggle showing details
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedChildName, setSelectedChildName] = useState(null);
  const childAge = calculateAge(selectedChild.DOB);

  const handleSponsorButtonClick = (childId, childName) => {
    setSelectedChildId(childId);
    setSelectedChildName(childName);
    setShowSponsorForm(true);
  };

  const handleViewDetailsClick = () => {
    setShowDetails(!showDetails); 
  };

  const handleBackButtonClick = () => {
    setShowDetails(false); // Close the details
  };
  

  return (
    <div className="child-card-container">
      
      <div className="child-card">
        {showDetails && (
          <button onClick={handleBackButtonClick} className="back-arrow-button">
            &#8592; Back
          </button>
        )}
        <div className="child-picture">
          <img
            src={selectedChild.image }
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
          <h2 id="childName">Name:{selectedChild.full_name}</h2>
          <p id="childAge">Age: {childAge}</p>
          <p id="childGender">Gender: {selectedChild.gender}</p>
          {showDetails && (
            <>
              <p id="childHealthConditions">Health Conditions: {selectedChild.health}</p>
              <p id="childPersonality">Personality: {selectedChild.hobbies}</p>
            </>
          )}
          {selectedChildId}
          <button onClick={handleViewDetailsClick}>
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          <button onClick={()=>handleSponsorButtonClick(selectedChild.childId, selectedChild.full_name)}>
            Sponsor
          </button>
        </div>
      </div>
      {showSponsorForm && (
        <div className="sponsor-form">
          <SponsorshipForm onClose={() => setShowSponsorForm(false)} childId = {selectedChildId} childName = {selectedChildName} />
        </div>
      )}
         <style jsx>{`
.child-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.child-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  width: 260px;
}


        `}</style>
    
    </div>
  );
};

export default ChildCardMaker;


 