import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your-publishable-key');


const PaymentPage = () => {
    const handlePaymentSuccess = async (token) => {
      try {
        // Simulate sending the token to your server for payment processing
        console.log('Simulating payment processing...');
        console.log('Received token:', token);
  
        // Simulate a successful payment
        console.log('Payment successful!');
  
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    };
  
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
      </Elements>
    );
  };
  
  export default PaymentPage;

