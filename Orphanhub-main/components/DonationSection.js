
// import React, { useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// import CheckoutForm from './CheckoutForm';

// const stripePromise = loadStripe('pk_test_51OZUSjSA5o77IliXHPCOndyfxz7Wkg9R6vF6HNwPQXmwrG8WeLKrsj9mH5hTkDccrL3fHUGgqumtpEsTAXScvxZP001bAllKI4');

// const DonationSection = ({ onClose, categories, allocation }) => {
//   const [donationAmount, setDonationAmount] = useState(0);
//   const [donorInfo, setDonorInfo] = useState({ name: '', email: '' });
//   const [isDonationClicked, setIsDonationClicked] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);

//   const handleDonateNowClick = () => {
//     const totalDonationAmount = Object.values(allocation).reduce((acc, val) => acc + val, 0);
//     setDonationAmount(totalDonationAmount);
//     onDonateNowClick();
//   };

//   const handleDonation = () => {
//     if (donorInfo.name && donorInfo.email && donationAmount > 0) {
//       setIsFormValid(true);
//       setIsDonationClicked(true);
//     } else {
//       setIsFormValid(false);
//     }
//   };

//   const handleCustomAmountChange = (e) => {
//     setDonationAmount(Number(e.target.value));
//   };

//   const handlePaymentSuccess = (token) => {
//     console.log('Payment successful:', token);
//     setShowNotification(true);
//   };

//   return (
//     <div className="donation-section">
//       {!isDonationClicked ? (
//         <div className="donor-info-form">
//           <div>
//             <p>Donate for a better future.</p>
//           </div>
//           <h4>Donor Information</h4>
//           <form>
//             <label htmlFor="donorName">Name:</label>
//             <input
//               type="text"
//               id="donorName"
//               value={donorInfo.name}
//               onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
//               required
//             />

//             <label htmlFor="donorEmail">Email:</label>
//             <input
//               type="email"
//               id="donorEmail"
//               value={donorInfo.email}
//               onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
//               required
//             />

//             <div className="donation-options">
//               <button onClick={() => setDonationAmount(100)}>Donate $100</button>
//               <button onClick={() => setDonationAmount(200)}>Donate $200</button>
//               <button onClick={() => setDonationAmount(500)}>Donate $500</button>
//               <button onClick={() => setDonationAmount(1000)}>Donate $1000</button>
//             </div>
//             <div className="custom-donation">
//               <label htmlFor="customAmount">Enter a custom amount:</label>
//               <input
//                 type="number"
//                 id="customAmount"
//                 value={donationAmount}
//                 onChange={handleCustomAmountChange}
//                 min="0"
//               />
//             </div>
//             <button type="button" onClick={handleDonation}>
//               Donate Now
//             </button>
//           </form>
//         </div>
//       ) : (
//         isFormValid && (
//           <React.Fragment>
//             <button onClick={() => setIsDonationClicked(false)} className="back-arrow-button">
//               &#8592;
//             </button>
//             <div>
//               <h3>Donation</h3>
//             </div>
//             <Elements stripe={stripePromise}>
//               <CheckoutForm
//                 donorInfo={donorInfo}
//                 donationAmount={donationAmount}
//                 onClose={onClose}
//                 onPaymentSuccess={handlePaymentSuccess}
//               />
//             </Elements>
//           </React.Fragment>
//         )
//       )}
//       {showNotification && <div className="notification">Thank you for your donation!</div>}
//     </div>
//   );
// };

// export default DonationSection;


import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51OZUSjSA5o77IliXHPCOndyfxz7Wkg9R6vF6HNwPQXmwrG8WeLKrsj9mH5hTkDccrL3fHUGgqumtpEsTAXScvxZP001bAllKI4');

// const DonationSection = ({ onClose, categories, allocation }) => {
//   const [donationAmount, setDonationAmount] = useState(0);
//   const [donorInfo, setDonorInfo] = useState({ name: '', email: '' });
//   const [isDonationClicked, setIsDonationClicked] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);

//   const handleDonateNowClick = () => {
//     const totalDonationAmount = Object.values(allocation).reduce((acc, val) => acc + val, 0);
//     setDonationAmount(totalDonationAmount);
//     onDonateNowClick();
//   };

//   const handleDonation = () => {
//     if (donorInfo.name && donorInfo.email && donationAmount > 0) {
//       setIsFormValid(true);
//       setIsDonationClicked(true);
//     } else {
//       setIsFormValid(false);
//     }
//   };

//   const handleCustomAmountChange = (e) => {
//     setDonationAmount(Number(e.target.value));
//   };

//   const handlePaymentSuccess = (token) => {
//     console.log('Payment successful:', token);
//     setShowNotification(true);
//   };

//   return (
//     <div className="donation-section">
//       {!isDonationClicked ? (
//         <div className="donor-info-form">
//           <div>
//             <p>Donate for a better future.</p>
//           </div>
//           <h4>Donor Information</h4>
//           <form>
//             <label htmlFor="donorName">Name:</label>
//             <input
//               type="text"
//               id="donorName"
//               value={donorInfo.name}
//               onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
//               required
//             />

//             <label htmlFor="donorEmail">Email:</label>
//             <input
//               type="email"
//               id="donorEmail"
//               value={donorInfo.email}
//               onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
//               required
//             />

//             <div className="donation-options">
//               <button onClick={() => setDonationAmount(100)}>Donate $100</button>
//               <button onClick={() => setDonationAmount(200)}>Donate $200</button>
//               <button onClick={() => setDonationAmount(500)}>Donate $500</button>
//               <button onClick={() => setDonationAmount(1000)}>Donate $1000</button>
//             </div>
//             <div className="custom-donation">
//               <label htmlFor="customAmount">Enter a custom amount:</label>
//               <input
//                 type="number"
//                 id="customAmount"
//                 value={donationAmount}
//                 onChange={handleCustomAmountChange}
//                 min="0"
//               />
//             </div>
//             <button type="button" onClick={handleDonation}>
//               Donate Now
//             </button>
//           </form>
//         </div>
//       ) : (
//         isFormValid && (
//           <React.Fragment>
//             <button onClick={() => setIsDonationClicked(false)} className="back-arrow-button">
//               &#8592;
//             </button>
//             <div>
//               <h3>Donation</h3>
//             </div>
//             <Elements stripe={stripePromise}>
//               <CheckoutForm
//                 donorInfo={donorInfo}
//                 donationAmount={donationAmount}
//                 onClose={onClose}
//                 onPaymentSuccess={handlePaymentSuccess}
//               />
//             </Elements>
//           </React.Fragment>
//         )
//       )}
//       {showNotification && <div className="notification">Thank you for your donation!</div>}
//     </div>
//   );
// };

// export default DonationSection;


const DonationSection = ({ onClose, categories, allocation }) => {
    const [donationAmount, setDonationAmount] = useState(0);
    const [donorInfo, setDonorInfo] = useState({ name: '', email: '' });
    const [isDonationClicked, setIsDonationClicked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showCheckoutForm, setShowCheckoutForm] = useState(true); // Track the visibility of CheckoutForm

    const handleDonateNowClick = () => {
        const totalDonationAmount = Object.values(allocation).reduce((acc, val) => acc + val, 0);
        setDonationAmount(totalDonationAmount);
        onDonateNowClick();
    };

    const handleDonation = () => {
        if (donorInfo.name && donorInfo.email && donationAmount > 0) {
            setIsFormValid(true);
            setIsDonationClicked(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleCustomAmountChange = (e) => {
        setDonationAmount(Number(e.target.value));
    };

    const handlePaymentSuccess = () => {
        setShowNotification(true);
        setShowCheckoutForm(false); // Close CheckoutForm
    };

    return (
      <div className="donation-section">
          {!isDonationClicked ? (
              <div className="donor-info-form">
                  <h4>Donor Information</h4>
                  <label htmlFor="name">Name:</label>
                  <input
                      type="text"
                      id="name"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      required
                  />
  
                  <label htmlFor="email">Email:</label>
                  <input
                      type="email"
                      id="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      required
                  />
  
                  <div className="donation-options">
                      <button onClick={() => setDonationAmount(100)}>Donate $100</button>
                      <button onClick={() => setDonationAmount(200)}>Donate $200</button>
                      <button onClick={() => setDonationAmount(500)}>Donate $500</button>
                      <button onClick={() => setDonationAmount(1000)}>Donate $1000</button>
                  </div>
  
                  <div className="custom-donation">
                      <label htmlFor="customAmount">Enter a custom amount:</label>
                      <input
                          type="number"
                          id="customAmount"
                          value={donationAmount}
                          onChange={handleCustomAmountChange}
                          min="0"
                      />
                  </div>
  
                  <button type="button" onClick={handleDonation}>
                      Donate Now
                  </button>
              </div>
          ) : (
              isFormValid && showCheckoutForm && (
                  <React.Fragment>
                      <div>
                          <h3>Donation</h3>
                      </div>
                      <Elements stripe={stripePromise}>
                          <CheckoutForm
                              donorInfo={donorInfo}
                              donationAmount={donationAmount}
                              onClose={onClose}
                              onPaymentSuccess={handlePaymentSuccess}
                          />
                      </Elements>
                  </React.Fragment>
              )
          )}
          {showNotification && <div className="notification">Thank you for your donation!</div>}
      </div>
  );
};

export default DonationSection;