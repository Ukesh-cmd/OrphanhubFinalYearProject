// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../util/constant';

const DonorManagement = () => {

  const [donorData, setDonorData] = useState([]);
  useEffect(() => {
    donorManage();
  },[])

  const donorManage = async() =>{
    try{
      const result = await axios(`${baseURL}/donor/get `);
      console.log(result.data);
      setDonorData(result.data);
    }catch(err){
      console.log("fetch error");
    }
  }
  // Dummy data
  

  const handleViewDetails = (donor) => {
    console.log('View Details:', donor);
  };

  return (
    <section className="user-management">
      <h3>User Management</h3>

      <table className="dashboard-table">
        <thead>
          <tr>
          <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Date</th>
            <th>payment Id</th>
          </tr>
        </thead>
        <tbody>
        {donorData.map((donor) => (
            <tr key={donor.id}>
              <td>{donor.id}</td>
              <td>{donor.name} </td>
              <td>{donor.email}</td>
              <td>${donor.amount}</td>
              <td>{donor.date}</td>
              
              <td>
                {donor.pid}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DonorManagement;
