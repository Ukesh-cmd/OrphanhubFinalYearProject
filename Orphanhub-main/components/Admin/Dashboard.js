// src/components/admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../util/constant';
const Dashboard = () => {
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdoptionRequests, setTotalAdoptionRequests] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  

  useEffect(() => {
    const fetchDashboardStatistics = async () => {
      try {
        const childrenResponse = await fetch(`${baseURL}/child/count`);
        const usersResponse = await fetch(`${baseURL}/user/count`);
        const adoptionRequestsResponse = await fetch(`${baseURL}/adoption/count`);
        const donationsResponse = await fetch(`/api/total-donations`);

        const childrenData = await childrenResponse.json();
        const usersData = await usersResponse.json();
        const adoptionRequestsData = await adoptionRequestsResponse.json();
        const donationsData = await donationsResponse.json();

        setTotalChildren(childrenData.count);
        setTotalUsers(usersData.totalUsers);
        setTotalAdoptionRequests(adoptionRequestsData.totalAdoptionRequests);
        setTotalDonations(donationsData.totalDonations);
      } catch (error) {
        console.error('Error fetching dashboard statistics:', error);
      }
    };

    fetchDashboardStatistics();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Total Children: {totalChildren}</h3>
     
      </div>
  
    </div>
  );
};

export default Dashboard;
