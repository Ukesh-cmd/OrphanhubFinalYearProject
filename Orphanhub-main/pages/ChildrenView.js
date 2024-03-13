import React, { useState, useEffect } from 'react';

const ChildrenView = ({ onViewDetail }) => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    fetch('/api/children')
      .then(response => response.json())
      .then(data => setChildren(data))
      .catch(error => console.error('Error fetching children:', error));
  }, []);

  return (
    <div>
      <h2>Children's Details</h2>
      <div className="child-cards">
        {children.map(child => (
          <div key={child.id} className="child-card-container">
            <div className="child-card">
              <div className="child-picture">
                <img src={child.image} alt={`${child.name}'s Picture`} />
              </div>
              <div className="child-details">
                <h2>{child.name}</h2>
                <p>Age: {child.age}</p>
                <p>Gender: {child.gender}</p>
                <div className="child-buttons">
                  <button onClick={() => onViewDetail(child.id)}>View Details</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildrenView;
