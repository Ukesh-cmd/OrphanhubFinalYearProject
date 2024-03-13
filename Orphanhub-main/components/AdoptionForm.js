
import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../util/constant';
const AdoptionForm = ({ onClose, childId, childName }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [adopterInfo, setAdopterInfo] = useState({ 
    name: '', 
    email: '', 
    address: '', 
    phone: '', 
    nationality: '', 
    occupation: '', 
    maritalStatus: 'single',
    marriageCertificate: null,
    financialStability: '',
    identificationProof: null,
    policeClerance: null
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const showNotificationForSeconds = (seconds) => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, seconds * 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('marriageCertificate', adopterInfo.marriageCertificate);
      formData.append('identificationProof', adopterInfo.identificationProof);
      formData.append('policeClerance', adopterInfo.policeClerance);
      formData.append('name', adopterInfo.name);
      formData.append('email', adopterInfo.email);
      formData.append('address', adopterInfo.address);
      formData.append('phone', adopterInfo.phone);
      formData.append('nationality', adopterInfo.nationality);
      formData.append('occupation', adopterInfo.occupation);
      formData.append('maritalStatus', adopterInfo.maritalStatus);
      formData.append('financialStability', adopterInfo.financialStability);

      const response = await axios.post(`${baseURL}/adoption/adopter`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const adopterId = response.data.adopterId;
        const adopterName = response.data.adopterName;
        const adopterEmail = response.data.adopterEmail;

        await axios.post(`${baseURL}/adoption/adopte`, {
          childId: childId,
          childName: childName,
          adopterName: adopterName,
          adopterEmail: adopterEmail,
          adopterId: adopterId
        });

        setAdopterInfo({ 
          name: '', 
          email: '', 
          address: '', 
          phone: '', 
          nationality: '', 
          occupation: '', 
          maritalStatus: 'single',
          marriageCertificate: null,
          financialStability: '',
          identificationProof: null,
          policeClerance: null
        });
        setIsFormValid(false);
        onClose();
      }
    } catch (error) {
      console.error('Error submitting adoption request:', error);
    }

    showNotificationForSeconds(5);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdopterInfo({ ...adopterInfo, [name]: value });
    handleFormValidation(); // Validate on every input change
  };

  const handleFileChange = (file, fieldName) => {
    setAdopterInfo({ ...adopterInfo, [fieldName]: file });
    handleFormValidation(); // Validate after file change
  };

  const handleFormValidation = () => {
    const { name, email, address, phone, nationality, occupation, maritalStatus } = adopterInfo;
    let isValid = name && email && address && phone && nationality && occupation && maritalStatus;

    if (maritalStatus === 'married') {
      isValid = isValid && adopterInfo.marriageCertificate;
    } else {
      isValid = isValid && adopterInfo.financialStability;
    }

    setIsFormValid(isValid);
  };
  
  return (
    <div className="adoption-form-container">
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form-row">
          <div className="form-column">
            <label htmlFor="adopterName">Name:</label>
            <input
              type="text"
              id="adopterName"
              name="name"
              value={adopterInfo.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="adopterEmail">Email:</label>
            <input
              type="email"
              id="adopterEmail"
              name="email"
              value={adopterInfo.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="adopterAddress">Address:</label>
            <input
              type="text"
              id="adopterAddress"
              name="address"
              value={adopterInfo.address}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="adopterPhone">Phone:</label>
            <input
              type="tel"
              id="adopterPhone"
              name="phone"
              value={adopterInfo.phone}
              onChange={handleInputChange}
              required
            />
             <label htmlFor="policeClerance">police Clearance:</label>
        <input
          type="file"
          id="policeClerance"
          name="policeClerance"
          onChange={(e) => handleFileChange(e.target.files[0], 'policeClerance')}
          required
        />
          </div>
          <div className="form-column">
            <label htmlFor="adopterNationality">Nationality:</label>
            <input
              type="text"
              id="adopterNationality"
              name="nationality"
              value={adopterInfo.nationality}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="adopterOccupation">Occupation:</label>
            <input
              type="text"
              id="adopterOccupation"
              name="occupation"
              value={adopterInfo.occupation}
              onChange={handleInputChange}
              required
            />
         <label htmlFor="adopterRelation">Marital Status:</label>
            <select
                     id="adopterRelation"
                 name="maritalStatus"
                value={adopterInfo.maritalStatus}
            onChange={handleInputChange}
         required
          >
  <option value="single">Single</option>
  <option value="married">Married</option>
</select>    
            {adopterInfo.maritalStatus === 'married' && (
              <div>
                <label htmlFor="marriageCertificate">Marriage Certificate:</label>
                <input
                  type="file"
                  id="marriageCertificate"
                  name="marriageCertificate"
                  onChange={(e) => handleFileChange(e.target.files[0], 'marriageCertificate')}
                  required
                />
              </div>
            )}
      <label htmlFor="financialStability">Financial Stability:</label>
<select
  id="financialStability"
  name="financialStability"
  value={adopterInfo.financialStability}
  onChange={handleInputChange}
  required
>
  <option value="">Select an option</option>
  <option value="very_stable">Very Stable</option>
  <option value="stable">Stable</option>
  <option value="unstable">Unstable</option>
</select>


        <label htmlFor="identificationProof">Identification Proof:</label>
        <input
          type="file"
          id="identificationProof"
          name="identificationProof"
          onChange={(e) => handleFileChange(e.target.files[0], 'identificationProof')}
          required
        />
       
        </div>
        </div>
 <button
  type="submit"
  onClick={handleFormValidation}
  disabled={!isFormValid}
  className={`adopt-button ${!isFormValid ? 'disabled' : ''}`}
>
  Adopt
</button>
        <button type="button" onClick={onClose} className="back-button">Back</button>
      </form>
      {showNotification && (
        <div className="notification">Adoption request in process...</div>
      )}
      <style jsx>{`
  /* Adoption Form Styles */
  .adoption-form-container {
    position: relative;
    background-color: #fff;
    padding: 20px;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 80vh;
  }

  .adoption-form-container::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    border-radius: 8px;
    background: linear-gradient(45deg, #ff6347, #ffa500, #ff6347, #ffa500);
    background-size: 400% 400%;
    animation: glowing 2s linear infinite;
  }
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }  

  .form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  /* Form Column Styles */
  .form-column {
    flex: 1;
    margin-right: 10px;
  }

  /* Label Styles */
  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }

  /* Input Styles */
  input,
  select {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }


  .adopt-button {
    background-color: #3493db;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }

  .adopt-button.disabled {
    opacity: 0.5;
    border-radius: 4px;
    cursor: not-allowed;
  }

  .adopt-button:hover {
    background-color: #2980b9;
  }
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.5s forwards, fadeOut 0.5s forwards 2s;
    z-index: 1000;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`}</style>

    </div>
  );
};

export default AdoptionForm;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { baseURL } from '../util/constant';
// const AdoptionForm = ({ onClose, childId, childName }) => {
//   const [showNotification, setShowNotification] = useState(false);
//   const [adopterInfo, setAdopterInfo] = useState({ 
//     name: '', 
//     email: '', 
//     address: '', 
//     phone: '', 
//     nationality: '', 
//     occupation: '', 
//     maritalStatus: 'single',
//     marriageCertificate: null,
//     financialStability: '',
//     identificationProof: null,
//     policeClearance: null
//   });
//   const [isFormValid, setIsFormValid] = useState(false);

//   const showNotificationForSeconds = (seconds) => {
//     setShowNotification(true);
//     setTimeout(() => {
//       setShowNotification(false);
//     }, seconds * 1000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('marriageCertificate', adopterInfo.marriageCertificate);
//       formData.append('identificationProof', adopterInfo.identificationProof);
//       formData.append('policeClearance', adopterInfo.policeClearance);
//       formData.append('name', adopterInfo.name);
//       formData.append('email', adopterInfo.email);
//       formData.append('address', adopterInfo.address);
//       formData.append('phone', adopterInfo.phone);
//       formData.append('nationality', adopterInfo.nationality);
//       formData.append('occupation', adopterInfo.occupation);
//       formData.append('maritalStatus', adopterInfo.maritalStatus);
//       formData.append('financialStability', adopterInfo.financialStability);

//       const response = await axios.post(`${baseURL}/adoption/adopter`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         const adopterId = response.data.adopterId;
//         const adopterName = response.data.adopterName;
//         const adopterEmail = response.data.adopterEmail;

//         await axios.post(`${baseURL}/adoption/adopte`, {
//           childId: childId,
//           childName: childName,
//           adopterName: adopterName,
//           adopterEmail: adopterEmail,
//           adopterId: adopterId
//         });

//         setAdopterInfo({ 
//           name: '', 
//           email: '', 
//           address: '', 
//           phone: '', 
//           nationality: '', 
//           occupation: '', 
//           maritalStatus: 'single',
//           marriageCertificate: null,
//           financialStability: '',
//           identificationProof: null,
//           policeClearance: null
//         });
//         setIsFormValid(false);
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error submitting adoption request:', error);
//     }

//     showNotificationForSeconds(5);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAdopterInfo({ ...adopterInfo, [name]: value });
//     handleFormValidation(); // Validate on every input change
//   };

//   const handleFileChange = (file, fieldName) => {
//     setAdopterInfo({ ...adopterInfo, [fieldName]: file });
//     handleFormValidation(); // Validate after file change
//   };

//   const handleFormValidation = () => {
//     const { name, email, address, phone, nationality, occupation, maritalStatus } = adopterInfo;
//     let isValid = name && email && address && phone && nationality && occupation && maritalStatus;

//     if (maritalStatus === 'married') {
//       isValid = isValid && adopterInfo.marriageCertificate;
//     } else {
//       isValid = isValid && adopterInfo.financialStability;
//     }

//     setIsFormValid(isValid);
//   };
  
//   return (
//     <div className="adoption-form-container">
//       <form onSubmit={handleSubmit} encType='multipart/form-data'>
//         <div className="form-row">
//           <div className="form-column">
//             <label htmlFor="adopterName">Name:</label>
//             <input
//               type="text"
//               id="adopterName"
//               name="name"
//               value={adopterInfo.name}
//               onChange={handleInputChange}
//               required
//             />
//             <label htmlFor="adopterEmail">Email:</label>
//             <input
//               type="email"
//               id="adopterEmail"
//               name="email"
//               value={adopterInfo.email}
//               onChange={handleInputChange}
//               required
//             />
//             <label htmlFor="adopterAddress">Address:</label>
//             <input
//               type="text"
//               id="adopterAddress"
//               name="address"
//               value={adopterInfo.address}
//               onChange={handleInputChange}
//               required
//             />
//             <label htmlFor="adopterPhone">Phone:</label>
//             <input
//               type="tel"
//               id="adopterPhone"
//               name="phone"
//               value={adopterInfo.phone}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-column">
//             <label htmlFor="adopterNationality">Nationality:</label>
//             <input
//               type="text"
//               id="adopterNationality"
//               name="nationality"
//               value={adopterInfo.nationality}
//               onChange={handleInputChange}
//               required
//             />
//             <label htmlFor="adopterOccupation">Occupation:</label>
//             <input
//               type="text"
//               id="adopterOccupation"
//               name="occupation"
//               value={adopterInfo.occupation}
//               onChange={handleInputChange}
//               required
//             />
//          <label htmlFor="adopterRelation">Marital Status:</label>
//             <select
//                      id="adopterRelation"
//                  name="maritalStatus"
//                 value={adopterInfo.maritalStatus}
//             onChange={handleInputChange}
//          required
//           >
//   <option value="single">Single</option>
//   <option value="married">Married</option>
// </select>    
//             {adopterInfo.maritalStatus === 'married' && (
//               <div>
//                 <label htmlFor="marriageCertificate">Marriage Certificate:</label>
//                 <input
//                   type="file"
//                   id="marriageCertificate"
//                   name="marriageCertificate"
//                   onChange={(e) => handleFileChange(e.target.files[0], 'marriageCertificate')}
//                   required
//                 />
//               </div>
//             )}
//       <label htmlFor="financialStability">Financial Stability:</label>
// <select
//   id="financialStability"
//   name="financialStability"
//   value={adopterInfo.financialStability}
//   onChange={handleInputChange}
//   required

//   <option value="">Select an option</option>
//   <option value="very_stable">Very Stable</option>
//   <option value="stable">Stable</option>
//   <option value="unstable">Unstable</option>
// </select>


//         <label htmlFor="identificationProof">Identification Proof:</label>
//         <input
//           type="file"
//           id="identificationProof"
//           name="identificationProof"
//           onChange={(e) => handleFileChange(e.target.files[0], 'identificationProof')}
//           required
//         /></div>
//         </div>
//  <button
//   type="submit"
//   onClick={handleFormValidation}
//   disabled={!isFormValid}
//   className={`adopt-button ${!isFormValid ? 'disabled' : ''}`}

//   Adopt
// </button>
//         <button type="button" onClick={onClose} className="back-button">Back</button>
//       </form>
//       {showNotification && (
//         <div className="notification">Adoption request in process...</div>
//       )}
//       <style jsx>{`
//   /* Adoption Form Styles */
//   .adoption-form-container {
//     position: relative;
//     background-color: #fff;
//     padding: 20px;
//     margin: 20px 0;
//     border-radius: 8px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     overflow-y: auto;
//     max-height: 80vh;
//   }

//   .adoption-form-container::before {
//     content: '';
//     position: absolute;
//     top: -5px;
//     left: -5px;
//     right: -5px;
//     bottom: -5px;
//     z-index: -1;
//     border-radius: 8px;
//     background: linear-gradient(45deg, #ff6347, #ffa500, #ff6347, #ffa500);
//     background-size: 400% 400%;
//     animation: glowing 2s linear infinite;
//   }
//   @keyframes slideIn {
//     from {
//       transform: translateX(100%);
//     }
//     to {
//       transform: translateX(0);
//     }
//   }

//   @keyframes fadeOut {
//     from {
//       opacity: 1;
//     }
//     to {
//       opacity: 0;
//     }
//   }  

//   .form-row {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 10px;
//   }

//   /* Form Column Styles */
//   .form-column {
//     flex: 1;
//     margin-right: 10px;
//   }

//   /* Label Styles */
//   label {
//     display: block;
//     margin-bottom: 5px;
//     color: #333;
//   }

//   /* Input Styles */
//   input,
//   select {
//     width: 100%;
//     padding: 5px;
//     margin-bottom: 10px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//   }


//   .adopt-button {
//     background-color: #3493db;
//     color: white;
//     cursor: pointer;
//     border-radius: 4px;
//   }

//   .adopt-button.disabled {
//     opacity: 0.5;
//     border-radius: 4px;
//     cursor: not-allowed;
//   }

//   .adopt-button:hover {
//     background-color: #2980b9;
//   }
//   .notification {
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     background-color: #3498db;
//     color: white;
//     padding: 10px 20px;
//     border-radius: 4px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//     animation: slideIn 0.5s forwards, fadeOut 0.5s forwards 2s;
//     z-index: 1000;
//   }

//   @keyframes glowing {
//     0% {
//       background-position: 0 0;
//     }
//     50% {
//       background-position: 400% 0;
//     }
//     100% {
//       background-position: 0 0;
//     }
//   }
// `}</style>

//     </div>
//   );
// };

// export default AdoptionForm;