
import React, { useState } from 'react';
import AdoptionRequestDetails from './AdoptionREquestDetails';

const AdoptionRequests = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([
    { id: 1, childName: 'John Doe', adopterName: 'Alice Smith', status: 'Pending' },
    { id: 2, childName: 'Jane Doe', adopterName: 'Bob Johnson', status: 'Accepted' },
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleViewDetails = (adoptionRequest) => {
    setSelectedRequest(adoptionRequest);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
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
            <th>View Details</th>
          </tr>
        </thead>
     
        <tbody>
          {adoptionRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.childName}</td>
              <td>{request.adopterName}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'Pending' && (
                  <button type="button" onClick={() => handleViewDetails(request)}>
                    View Details
                  </button>
                )}
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