// src/components/admin/DonationGoals.js
import React, { useState, useEffect } from 'react';

const DonationGoals = () => {
  const [donationGoal, setDonationGoal] = useState(0);

  useEffect(() => {

    const fetchDonationGoals = async () => {
      try {
    
        const response = await fetch('/api/donation-goals');
        const data = await response.json();

        setDonationGoal(data.donationGoal);
      } catch (error) {
        console.error('Error fetching donation goals:', error);
      }
    };

    fetchDonationGoals(); 
  }, []); 

  const saveDonationGoal = () => {
    console.log('Saving donation goal:', donationGoal);
    
  };

  return (
    <div>
      <h2>Donation Goals</h2>
      <div>
        <label>Set Donation Goal:</label>
        <input
          type="number"
          value={donationGoal}
          onChange={(e) => setDonationGoal(Number(e.target.value))}
        />
      </div>
      <button onClick={saveDonationGoal}>Save Donation Goal</button>
    </div>
  );
};

export default DonationGoals;
