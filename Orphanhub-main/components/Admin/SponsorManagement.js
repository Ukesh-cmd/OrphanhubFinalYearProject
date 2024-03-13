// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../util/constant';
// import viewCardMaker from './AdminContainer';
const SponsorManagement = () => {

    const [selectedSponsor, setSelectedSponsor] = useState(null)
  const [sponsorData, setSponsorData] = useState([]);
  useEffect(() => {
    sponsorManage();
  },[])

  const handleViewDetails = (sponsorId) => {
    setShowBackButton(true);
  };

  const sponsorManage = async() =>{
    try{
      const result = await axios(`${baseURL}/get/sponsorChild`);
      console.log(result.data);
      setSponsorData(result.data);
    }catch(err){
      console.log("fetch error");
    }
  }
  // Dummy data
  

  return (
    <section className="user-management">
      <h3>User Management</h3>

      <table className="dashboard-table">
        <thead>
          <tr>
          <th>S.N</th>
            <th>sponsor Id</th>
            <th>Child Id</th>
            <th>Sponsor Name</th>
            <th> sponsor Email</th>
            <th>child Name</th>
            <th>Amount</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
        {sponsorData.map((sponsor, index) => (
            <tr key={sponsor.id}>
                <td>{index+1}</td>
              <td>{sponsor.sponsorId}</td>
              <td>{sponsor.childId}</td>
              <td>{sponsor.sname}</td>
              <td>{sponsor.email} </td>
              <td>{sponsor.childName}</td>
              <td>{sponsor.amount}</td>
              <td>{sponsor.date}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SponsorManagement;
