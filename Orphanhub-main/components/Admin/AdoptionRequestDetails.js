import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../util/constant';
const AdoptionRequestDetails = ({ request, onClose, acceptRequest, rejectRequest }) => {
  const [adopterDetail, setAdopterDetails] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptError, setAcceptError] = useState(null);
  const [rejectError, setRejectError] = useState(null);


  useEffect(() => {
    fetchAdopter();
  }, []);

  const fetchAdopter = async () => {
    try {
      const result = await axios(`${baseURL}/adoption/show/${request.adopterId}`);
      const adopterd = result.data;
      
      setAdopterDetails(adopterd);
    } catch (err) {
      console.log("fetch error", err);
    }
  };
  // useEffect(() => {
  //   const fetchAdopter = async () => {
  //     try {
  //       const response = await getAdopterDetails(request.id); // Assuming request.id is the adopterId
  //       setAdopterDetails(response.data); 
  //     } catch (error) {
  //       console.error('Error fetching adopter details:', error);
  //     }
  //   };
  //   fetchAdopter();
  // }, [request.id]);

  const toggleCertificate = () => {
    setShowCertificate(!showCertificate);
  };

  const handleAccept = async () => {
    setLoading(true);
    try {
      await acceptRequest(request.id);
      request.status = 'Accepted';
    } catch (error) {
      setAcceptError('Failed to accept request');
      console.error('Error accepting request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await rejectRequest(request.id);
      request.status = 'Rejected';
    } catch (error) {
      setRejectError('Failed to reject request');
      console.error('Error rejecting request:', error);
    } finally {
      setLoading(false);
    }
  };

  // const modalStyle = {
  //   position: 'fixed',
  //   zIndex: 1,
  //   left: '50%',
  //   top: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   backgroundColor: '#fefefe',
  //   padding: '20px',
  //   boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  //   borderRadius: '4px',
  //   width: '80%',
  //   maxWidth: '600px',
  //   border: '1px solid #888',
  //   overflow: 'auto'
    
  // };

  const closeStyle = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    padding: '10px 24px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '5px',
  

  };

  return (
    <div className="modal" >
      <div className="modal-content">
        <span className="close" style={closeStyle} onClick={onClose}>&times;</span>
        <h2>Adoption Request Details</h2>
        <p><strong>ID:</strong> {request.adoptionId}</p>
        <p><strong>Child Name:</strong> {request.childName}</p>
        <p><strong>Adopter Name:</strong> {request.adopterName}</p>
        <p><strong>Status:</strong> {request.reqstatus}</p>
        

        <div id="dashboard-table"><button onClick={toggleCertificate}>
          {showCertificate ? 'Hide Certificate' : 'Show Certificate'}
        </button></div>
        
        {showCertificate  && adopterDetail && (
          
          <div>
            
            <style jsx>{`
            .modal {
              display: none;
              position: fixed;
              z-index: 1;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              overflow: auto;
              background-color: rgba(255, 255, 255, 0.8); 
          }
          
          .modal-content {
              background-color: #fefefe;
              margin: 10% auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              max-width: 80%;
              overflow-y: auto;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .close {
              color: #aaa;
              float: right;
              font-size: 24px;
              font-weight: bold;
              cursor: pointer;
          }
          
          .close:hover,
          .close:focus {
              color: #333;
          }
          
          .modal-content img {
              max-width: 100%;
              height: auto;
              margin-bottom: 10px;
          }
          
          @media only screen and (max-width: 768px) {
              .modal-content {
                  margin: 20px;
                  padding: 15px;
                  max-width: calc(100% - 40px);
              }
          
              .close {
                  font-size: 20px;
              }
          }
          .modal-content p {
            margin-bottom: 10px;
            line-height: 1.5;
            color: #333;
        }
    `}</style>
              <p><strong>Adopter Name:</strong> {adopterDetail[0].fullName}</p>
              <p><strong>Adopter Email:</strong> {adopterDetail[0].email}</p>
              <p><strong>Adopter Phone:</strong> {adopterDetail[0].phone}</p>
              <p><strong>Adopter Occupation:</strong> {adopterDetail[0].occupation}</p>
              <p><strong>Adopter Age:</strong> {adopterDetail[0].age}</p>
              <p><strong>Adopter Address:</strong> {adopterDetail[0].address}</p>
              <p><strong>Adopter maritalStatus:</strong> {adopterDetail[0].maritalStatus}</p>
              <p><strong>identification Proof:</strong></p>
              <img src={adopterDetail[0].image2} alt="Marriage Certificate" />
              <p><strong>Police Screen
                :</strong></p>
              <img src={adopterDetail[0].image1} alt="Marriage Certificate" />
            
          </div>
        )}
        <div>
       
          <button style={buttonStyle} onClick={handleAccept} disabled={loading || request.status !== 'Pending'}>
            {loading ? 'Accepting...' : 'Accept'}
          </button>
          <button style={buttonStyle} onClick={handleReject} disabled={loading || request.status !== 'Pending'}>
            {loading ? 'Rejecting...' : 'Reject'}
          </button>
        </div>
        {acceptError && <p>{acceptError}</p>}
        {rejectError && <p>{rejectError}</p>}
      </div>
      
    </div>
  );
};

export default AdoptionRequestDetails;

