// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../util/constant';
import axios from 'axios';
const AdminDashboard = () => {
  const [totalChildren, setTotalChildren] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalAdoptionRequests, setTotalAdoptionRequests] = useState([]);
  const [donationGoal, setDonationGoal] = useState(5000);
  const [totalDonation, setTotalDonation] = useState(0);

  const [allocationData, setAllocationData] = useState([]);

  useEffect(() => {
    allocat();
  }, []);

  const allocat = async () => {
    try {
      const result = await axios(`${baseURL}/allocatedAmount`);
      setAllocationData(result.data);
    } catch (err) {
      console.log("fetch error", err);
    }
  };

 
  useEffect(() => {
    totalChild();
    totaluser();  
    totalAdoption();
    totalAmount();
  }, []); 

 
  // showing total children
  const totalChild = async () => {
    try {
      const result = await axios.get(`${baseURL}/child/count`);
      const count = result.data;
      setTotalChildren(count);
    } catch (err) {
      console.error('Error fetching count:', err);
    }
  };
  //showing total users
  const totaluser = async()=>{
    try{
       const response = await axios.get(`${baseURL}/user/count`)
         setTotalUsers(response.data);
    }catch(err){
      console.log(err);
    }
    
  }
  //showing total request 
  const totalAdoption = async()=>{
    try{
       const response = await axios.get(`${baseURL}/adoption/count`)
       console.log("total", response.data);
         setTotalAdoptionRequests(response.data);
    }catch(err){
      console.log(err);
    } 
  }

  //showing total donation 

  const totalAmount = async()=>{
    try{
       const response = await axios.get(`${baseURL}/donor/total`)
       console.log("total", response.data);
         setTotalDonation(response.data);
    }catch(err){
      console.log(err);
    } 
  }

  
const completedGoals = Math.floor(totalDonation / donationGoal);
const remainingForCurrentGoal = totalDonation % donationGoal;

const donationProgress = (remainingForCurrentGoal / donationGoal) * 100;

  return (
    <div>
    <style jsx>{`
    
.admin-dashboard {
  background-color: lightgreen;
  padding: 20px;
}
    .dashboard-metrics {
      /* Styles for the dashboard metrics section */
      display: flex;
      flex-direction: row; /* Display metrics in a row */
      flex-wrap: wrap; /* Allow metrics to wrap to the next line if needed */
      justify-content: space-between; /* Distribute metrics evenly along the row */
      gap: 10px; /* Add some space between metrics */
      background-color:orange;
    }
    
    .metric {
      /* Styles for individual metrics */
      /* Add your styles here */
      border: 2px solid green; /* Add borders or other styles to visually separate metrics */
      padding: 9px;
      width: calc(50% - 5px); /* Set width to 50% of the container minus half of the gap */
      box-sizing: border-box; /* Include padding in the width calculation */
    }
    
    .metric:nth-child(even) {
      /* Styles for even-numbered metrics */
      order: 1; /* Place even-numbered metrics first in the visual order */
    }
    
    .metric:nth-child(odd) {
      /* Styles for odd-numbered metrics */
      order: 2; /* Place odd-numbered metrics second in the visual order */
    }
    `}</style>
    
    <section className="admin-dashboard">
      <h3>Admin Dashboard</h3>

      <div className="dashboard-metrics">
        <div className="metric">
          <h4>Total Children</h4>
          <p>{totalChildren}</p>
        </div>

        <div className="metric">
          <h4>Total Users</h4>
          <p>{totalUsers}</p>
        </div>

        <div className="metric">
          <h4>Total Adoption Requests</h4>
          <p>{totalAdoptionRequests}</p>
        </div>

        <div className="metric">
          <h4>Donation Goal</h4>
          <p>${donationGoal}</p>
        </div>

        <div className="metric">
          <h4>Total Donation</h4>
          <p>${totalDonation}</p>
        </div>
      </div>

      <div className="donation-progress">
        <h4>Donation Progress</h4>
        <div className="progress-bar">
          <div style={{ width: `${donationProgress}% `}}></div>
        </div>
        <p>{donationProgress.toFixed(2)}% completed</p>
        <div className="allocation-table">
          <h4>Previous Day Allocation</h4>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            {Array.isArray(allocationData)&& allocationData.length>0 ? (
            <tbody>
              {allocationData.map((allocation, index) => (
                <tr key={index}>
                  <td>{allocation.name}</td>
                  <td>${allocation.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>):(
              <tbody>
              
                <tr >
                  <td>No aocation data</td>
                  
                </tr>
             
            </tbody>
            )}
          </table>
        </div> 
    </div>
    
    </section>
    </div>
  );
};

export default AdminDashboard;
