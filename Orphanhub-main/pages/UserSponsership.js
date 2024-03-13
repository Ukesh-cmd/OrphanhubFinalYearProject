// 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChildCardMaker from '../components/ChildCardMaker';
//import HighestAgeViewCard from '../components/highestageviewcard';
import RotatingChildCards from '../components/RotatingChildCard';
const UserSponsorship = () => {
  const [recommendedChildren, setRecommendedChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [highestAgeChild, setHighestAgeChild] = useState(null);
  const [highestAge, setHighestAge] = useState(null);
  const [selectedChildForModal, setSelectedChildForModal] = useState(null);

  useEffect(() => {
    const fetchRecommendedChildren = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/child/recommended');
        setRecommendedChildren(response.data.results);
      } catch (error) {
        console.error('Error fetching recommended children:', error);
      }
    };

    fetchRecommendedChildren();
  }, []);

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = currentDate.getMonth() - dobDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleAgeChange = (age) => {
    if (!highestAge || age > highestAge) {
      setHighestAge(age);
      setHighestAgeChild(selectedChild);
    }
  };

  const handleViewDetails = (childId) => {
    const child = recommendedChildren.find((child) => child.childId === childId);
    setSelectedChildForModal(child);
    setHighestAgeChild(null);
  };

  const handleCloseDetails = () => {
    setSelectedChildForModal(null);
  };

  return (
    <section className="user-sponsorship">
      <h3>Sponsor a Child</h3>
      {selectedChild && (
        <ChildCardMaker selectedChild={{ ...selectedChild }} onBackButtonClick={handleCloseDetails} calculateAge={calculateAge} />
      )}
{highestAgeChild && (
  <div className="highest-age-card">
    <HighestAgeViewCard selectedChild={highestAgeChild} calculateAge={calculateAge} />
  </div>
)}



      {selectedChildForModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="back-arrow-button" onClick={handleCloseDetails}>    &#8592; Close</button>
            <ChildCardMaker selectedChild={selectedChildForModal} calculateAge={calculateAge} />
          </div>
        </div>
      )}
      <div className="child-filter-table">
        <h3>Recommended Children</h3>
       <div className='Rotatingcontainer'> <RotatingChildCards/></div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recommendedChildren.map((child) => (
              <tr key={child.childId}>
                <td>{child.full_name}</td>
                <td>{calculateAge(child.date_of_birth)}</td>
                <td>{child.gender}</td>
                <td>
                  <button onClick={() => handleViewDetails(child.childId)}>View Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
 .user-sponsorship {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
}
.Rotatingcontainer {
  width: 300px;
  margin-left: 20px; 
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-image: linear-gradient(45deg, #f2f2f2, #f2f2f2 50%, #f2f2f2 75%);
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  max-width: 800px;
  width: 100%;
  position: relative;
  color: #333;
}
.h3 {
  margin-left: 70%;
}


.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

.close-button:hover {
  background-color: #f2f2f2;
  color: #4CAF50;
}
    
    .child-filter-table {
      width: 80%;
      margin-top: 20px;
      overflow-x: auto;
      display: flex;
      justify-content: center;
    }
    .dashboard-table {
      border-collapse: collapse;
      width: 80%;
      margin: 0 auto;
    }
  
    .dashboard-table th,
    .dashboard-table td {
      border: 1px solid #dddddd;
      padding: 8px;
    }
  
    .dashboard-table tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  
    .dashboard-table th {
      padding-top: 11px;
      padding-bottom: 11px;
      text-align: left;
      background-color: #4CAF50;
      color: white;
    }
    .dashboard-table button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 11px 15px; 
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 1rem;
      margin: 4px 2px;
      cursor: pointer;
    }
  
    .dashboard-table button:hover {
      opacity: 0.8;
    }
    @media screen and (max-width: 768px) {
      .child-filter-table h3 {
        font-size: 1.5rem;
      }
    }
    @media screen and (max-width: 600px) {
      .dashboard-table {
        width: 100%;
      }
      
      .dashboard-table th,
      .dashboard-table td {
        padding: 5px;
        font-size: 12px;
      }
    }
        `}</style>
    </section>
  );
};

export default UserSponsorship;