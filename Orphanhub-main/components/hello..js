// import React, { useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// import CheckoutForm from './CheckoutForm';
// import SponsorCheckout from './SponsorCheckout';

// const stripePromise = loadStripe('pk_test_51OZUSjSA5o77IliXHPCOndyfxz7Wkg9R6vF6HNwPQXmwrG8WeLKrsj9mH5hTkDccrL3fHUGgqumtpEsTAXScvxZP001bAllKI4');
// const SponsorForm = ({ onClose, categories, allocation }) => {
//     const [sponsorshipDuration, setSponsorshipDuration] = useState('');
//     const [sponsorAmount, setSponsorAmount] = useState(0);
//     const [sponsorInfo, setSponsorInfo] = useState({ name: '', email: '' });
//     const [isSponsorClicked, setIsSponsorClicked] = useState(false);
//     const [isFormValid, setIsFormValid] = useState(false);
//     const [showNotification, setShowNotification] = useState(false);
//     const [showCheckoutForm, setShowCheckoutForm] = useState(true); // Track the visibility of CheckoutForm

//     // const handleDonateNowClick = () => {
//     //     const totalDonationAmount = Object.values(allocation).reduce((acc, val) => acc + val, 0);
//     //     setSponsorAmount(totalSponsorAmount);
//     //     onSponsorNowClick();
//     // };

//     const handleSponsor = () => {
//         if (sponsorInfo.name && sponsorInfo.email && sponsorAmount > 0) {
//           setIsFormValid(true);
//           setIsSponsorClicked(true);
//         } else {
//           setIsFormValid(false);
//         }
//       };

//     const handleCustomAmountChange = (e) => {
//         setDonationAmount(Number(e.target.value));
//     };

//     const handlePaymentSuccess = () => {
//         setShowNotification(true);
//         setShowCheckoutForm(false); // Close CheckoutForm
//     };

//     return (
//       <div className="sponsor-section">
//           {!isSponsorClicked ? (
//               <div className="donor-info-form">
//                   <h4>Donor Information</h4>
//                   <label htmlFor="duration">Select duration You would to sponsor the Child for:</label>
//                     <div className="donation-options">
//                         <button onClick={() => setSponsorshipDuration('one-month')}>Monthly</button>
//                         <button onClick={() => setSponsorshipDuration('six-months')}>Six Months</button>
//                         <button onClick={() => setSponsorshipDuration('one-year')}>Yearly</button>
//                     </div>
//                   <label htmlFor="name">Name:</label>
//                   <input
//                     type="text"
//                     id="sponsorName"
//                     value={sponsorInfo.name}
//                     onChange={(e) => setSponsorInfo({ ...sponsorInfo, name: e.target.value })}
//                     required
//                 />
//                 <label htmlFor="sponsorEmail">Email:</label>
//                 <input
//                     type="email"
//                     id="sponsorEmail"
//                     value={sponsorInfo.email}
//                     onChange={(e) => setSponsorInfo({ ...sponsorInfo, email: e.target.value })}
//                     required
//                 />
//                 <div className="sponsor-options">
//                     <button onClick={() => setSponsorAmount(100)}>Donate $100</button>
//                     <button onClick={() => setSponsorAmount(200)}>Donate $200</button>
//                     <button onClick={() => setSponsorAmount(500)}>Donate $500</button>
//                     <button onClick={() => setSponsorAmount(1000)}>Donate $1000</button>
//                 </div>
  
//                 <div className="custom-donation">
//                 <label htmlFor="customAmount">Enter a custom amount:</label>
//                 <input
//                   type="number"
//                   id="customAmount"
//                   value={sponsorAmount}
//                   onChange={handleCustomAmountChange}
//                   min="0"
//                 />
//               </div>
  
//               <button type="button" onClick={handleSponsor}>
//                 Sponsor
//               </button>
//             </div>
//           ) : (
//               isFormValid && showCheckoutForm && (
//                   <React.Fragment>
//                       <div>
//                           <h3>Sponsor</h3>
//                       </div>
//                       <Elements stripe={stripePromise}>
//                           <CheckoutForm
//                               sponsorInfo={sponsorInfo}
//                               sponsorAmount={sponsorAmount}
//                               onClose={onClose}
//                               onPaymentSuccess={handlePaymentSuccess}
//                               childId={childId}
//                             childName={childName}
//                           />
//                       </Elements>
//                   </React.Fragment>
//               )
//           )}
//           {showNotification && <div className="notification">Thank you for your donation!</div>}
//       </div>
//   );
// };

// export default SponsorForm ;