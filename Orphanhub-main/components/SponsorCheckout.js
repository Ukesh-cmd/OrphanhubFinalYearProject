import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const SponsorCheckout = ({ sponsorInfo, sponsorAmount, sponsorType, childId, childName }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    const handlePaymentSuccess = async (sponsorInfo, sponsorAmount, sponsorType, childId, childName, tok) => {
        try {
            // Post sponsor data to the database
            await fetch('http://localhost:3005/api/sponsor/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sponsorInfo: sponsorInfo,
                    sponsorAmount: sponsorAmount,
                    name: childName,
                    sponsorType: sponsorType,
                    id: childId,
                    token: tok,
                }),
            });

            setPaymentSuccessful(true);
        } catch (error) {
            setPaymentError('Payment failed');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submit button clicked');
        if (!stripe || !elements) {
            return;
        }
    
        const cardElement = elements.getElement(CardElement);
    
        try {
            const { token, error } = await stripe.createToken(cardElement);
    
            if (error) {
                setPaymentError(error.message);
                return;
            }
    
            if (token) {
                await handlePaymentSuccess(sponsorInfo, sponsorAmount, sponsorType, childId, childName, token);
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
                    <input type="text" id="name" value={sponsorInfo?.name || ''} readOnly />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={sponsorInfo?.email || ''} readOnly />
                </div>
                <div className="input-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" value={sponsorAmount || ''} readOnly />
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
            {paymentError && (
                <div className="payment-error">
                    {paymentError}
                </div>
            )}
        </div>
    );
};

export default SponsorCheckout;
