// src/components/AdoptionRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../util/constant';
import AdoptionRequestDetails from './AdoptionRequestDetails';

const AdoptionRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [adoptionData, setAdoptionData] = useState([]);
  useEffect(() => {
    adoptionManage();
  },[])

  const adoptionManage = async() =>{
    try{
      const result = await axios(`${baseURL}/adoption/showadoption `);
      console.log(result.data);
      setAdoptionData(result.data);
    }catch(err){
      console.log("fetch error");
    }
  }
  

  
  const handleViewDetails = (adoptionRequest) => {
    setSelectedRequest(adoptionRequest);
  };
  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const handleAcceptRequest = async(id) => {
    try{
      const acc = await axios.put(`${baseURL}/adoption/handlerequest/${id}`,{
        reqstatus :  "Approved",
      })
      if(acc===200){
        console.log("Successed");
      }
      else{
        console.log("error");
      }
    }catch(err){
      console.log(err);
    }
   
    
  };

  const handleRejectRequest = async(id) => {
    try{
      const reject = await axios.put(`${baseURL}/adoption/handlerequest/${id}`,{
        reqstatus :  "Rejected",
      })
      if(reject===200){
        console.log("Successed");
      }
      else{
        console.log("error");
      }
    }
    catch(err){
      console.log(err);
  }
    
  };

  return (
    <section className="adoption-requests">
      <h3>Adoption Requests</h3>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Child Name</th>
            <th>Adopter Name</th>
            <th>Status</th>
            <th>Accept</th>
            <th>Reject</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {adoptionData.map((request) => (
            <tr key={request.adoptionId}>
              <td>{request.adoptionId}</td>
              <td>{request.childName}</td>
              <td>{request.adopterName}</td>
              <td>{request.reqstatus}</td>
              <td>
                {request.reqstatus === 'Pending' && (
                  <button type="button" onClick={() => handleAcceptRequest(request.adoptionId)}>
                    Accept
                  </button>
                )}
              </td>
              <td>
                {request.reqstatus === 'Pending' && (
                  <button type="button" onClick={() => handleRejectRequest(request.adoptionId)}>
                    Reject
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleViewDetails(request)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRequest && (
        <AdoptionRequestDetails request={selectedRequest} onClose={handleCloseDetails} />
      )}
    </section>
  );
};

export default AdoptionRequests;
