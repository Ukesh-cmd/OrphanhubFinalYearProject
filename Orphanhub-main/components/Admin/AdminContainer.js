// import React, { useState } from 'react';


 
 
// const viewCardMaker = ({ sponsorId }) => {
  
//   const [showDetails, setShowDetails] = useState(false); // State to toggle showing details
//   const [selectedChildId, setSelectedChildId] = useState(null);
  
//   const childAge = calculateAge(selectedChild.DOB);

  

//   const handleViewDetailsClick = () => {
//     setShowDetails(!showDetails); 
//   };

//   const handleBackButtonClick = () => {
//     setShowDetails(false); // Close the details
//   };
  

//   return (
//     <div className="child-card-container">
      
//       <div className="child-card">
//         {showDetails && (
//           <button onClick={handleBackButtonClick} className="back-arrow-button">
//             &#8592; Back
//           </button>
//         )}
//         <div className="child-picture">
//           <img
//             src={selectedChild.image }
//             alt="Child Picture"
//             style={{
//               maxWidth: '100%',
//               height: 'auto',
//               borderRadius: '50%',
//               marginTop: '10px',
//               marginBottom: '10px',
//               boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
//             }}
//           />
//         </div>
//         <div className="child-details">
//           <h2 id="childName">Name:{selectedChild.full_name}</h2>
//           <p id="childAge">Age: {childAge}</p>
//           <p id="childGender">Gender: {selectedChild.gender}</p>
//           {showDetails && (
//             <>
//               <p id="childHealthConditions">Health Conditions: {selectedChild.health}</p>
//               <p id="childPersonality">Personality: {selectedChild.hobbies}</p>
//             </>
//           )}
//           {selectedChildId}
//           <button onClick={handleViewDetailsClick}>
//             {showDetails ? 'Hide Details' : 'View Details'}
//           </button>
//         </div>
//       </div>
      
//          <style jsx>{`
// .child-card-container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
// }

// .child-card {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: #ffffff;
//   border-radius: 10px;
//   padding: 20px;
//   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
//   width: 260px;
// }


//         `}</style>
    
//     </div>
//   );
// };

// export default viewChildCardMaker;


 