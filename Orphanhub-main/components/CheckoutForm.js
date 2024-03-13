

// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const CheckoutForm = ({ donorInfo, donationAmount }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [paymentError, setPaymentError] = useState(null);
//     const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  
//     // const handlePaymentSuccess = async (donorInfo, donationAmount, token) => {
//     //     try {
//     //         const response = await fetch('http://localhost:3005/api/payment/process', {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({
//     //                 donorInfo: donorInfo,
//     //                 donationAmount: donationAmount,
//     //                 token: token,
//     //             }),
//     //         });
//     //         const data = await response.json();
//     //         if (response.status === 200 && data.status === 'succeeded') {
//     //             setShowNotification(true);
//     //             setShowCheckoutForm(false); // Close CheckoutForm
//     //         } else {
//     //             setPaymentError(data.error || 'Payment failed');
//     //         }
//     //     } catch (error) {
//     //         setPaymentError('Payment failed');
//     //     }
//     // };
//     // const handleSubmit = async (event) => {
//     //     event.preventDefault();

//     //     if (!stripe || !elements) {
//     //         return;
//     //     }

//     //     const cardElement = elements.getElement(CardElement);

//     //     try {
//     //         const { token } = await stripe.createToken(cardElement);

//     //         if (token) {
//     //             await handlePaymentSuccess(donorInfo, donationAmount, token);
//     //         }
//     //     } catch (error) {
//     //         setPaymentError('Payment failed');
//     //     }
//     // };
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         try {
//             const { paymentMethod, error } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: cardElement,
//             });

//             if (error) {
//                 setPaymentError(error.message);
//                 return;
//             }

//             // Send paymentMethod.id to your server for further processing
//             const response = await fetch('http://localhost:3005/api/payment/process', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     donorInfo: donorInfo,
//                     donationAmount: donationAmount,
//                     paymentMethodId: paymentMethod.id,
//                 }),
//             });

//             const data = await response.json();

//             if (response.status === 200 && data.status === 'succeeded') {
//                 onPaymentSuccess();
//             } else {
//                 setPaymentError(data.error || 'Payment failed');
//             }
//         } catch (error) {
//             setPaymentError('Payment failed');
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit} className="donor-info-form">
//                 <h4>Donor Information</h4>
//                 <label>
//                     Card details
//                     <CardElement className="card-element" />
//                 </label>
//                 <div className="input-group">
//                     <label htmlFor="name">Name:</label>
//                     <input type="text" id="name" value={donorInfo?.name || ''} readOnly />
//                 </div>
//                 <div className="input-group">
//                     <label htmlFor="email">Email:</label>
//                     <input type="email" id="email" value={donorInfo?.email || ''} readOnly />
//                 </div>
//                 <div className="input-group">
//                     <label htmlFor="amount">Amount:</label>
//                     <input type="text" id="amount" value={donationAmount || ''} readOnly />
//                 </div>
//                 {paymentError && <div className="payment-error">{paymentError}</div>}
//                 <button type="submit" disabled={!stripe} className="donate-now-button">
//                     Confirm Payment
//                 </button>
//             </form>
//             {paymentSuccessful && <div className="payment-success-message">Payment successful</div>}
//             {paymentError && <div className="payment-error">{paymentError}</div>}
//         </div>
//     );
// };

// export default CheckoutForm;



import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ donorInfo, donationAmount, sponsorInfo, sponsorAmount, childId, childName }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [sponsorType, setIsSponsor] = useState(false);

    const handlePaymentSuccess = async (donorInfo, donationAmount,sponsorInfo, sponsorAmount, childId, childName, tok) => {
    try {
        // Post donor data to the database
        let requestBody;
        if(sponsorType){
            requestBody = {
                sponsInfo: sponsorInfo,
                sponsorAmount: sponsorAmount,
                name : childName,
                id: childId,
                token: tok,
            }
        }
        else{
            requestBody = { 
            donorInfo: donorInfo,
            donationAmount: donationAmount,
            token: tok,
        }
        }

        const apiURL = childName ? 'http://localhost:3005/api/sponsor/payment' : 'http://localhost:3005/api/payment/process';
        await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        setPaymentSuccessful(true);
    } catch (error) {
        setPaymentError('Payment failed');
    }
};

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
        const { token } = await stripe.createToken(cardElement);

        if (token) {
            if (sponsorType) {
                await handlePaymentSuccess(null, null, sponsorInfo, sponsorAmount, childId, childName, token);
            } else {
                await handlePaymentSuccess(donorInfo, donationAmount, null, null, null, null, token);
            }
        }
    } catch (error) {
        setPaymentError('Payment failed');
    }
};

    return (
        <div>
            <form onSubmit={handleSubmit} className="donor-info-form">
                <h4>Donor Information</h4>
                <label>
                    Card details
                    <CardElement className="card-element" />
                </label>
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={donorInfo?.name || sponsorInfo?.name ||''} readOnly />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={donorInfo?.email || sponsorInfo?.email ||''} readOnly />
                </div>
                <div className="input-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" value={donationAmount || sponsorAmount ||''} readOnly />
                </div>
                
                <button type="submit" disabled={!stripe} className="donate-now-button">
                    Confirm Payment
                </button>
            </form>
            {paymentSuccessful && (
            <div className="payment-success-message">
                Payment successful
            </div>
        )}
           
        </div>
    );
};

export default CheckoutForm;