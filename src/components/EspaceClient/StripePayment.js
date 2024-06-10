import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PM93EP08thL8YjU0rYFxQHB7E0QvfefWS3YftiVXOb76yaefza5qau5RZ4W9dL3pAqMMAM68NJcyzIyg895aV8u00kSxVGtAd');

const StripePayment = ({ amount, factureId, handlePaymentClick }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        axios.post('/api/create-payment-intent', { amount: amount * 100 }) // Convert amount to cents
            .then(response => {
                setClientSecret(response.data.clientSecret);
            })
            .catch(error => {
                console.error('Error creating payment intent:', error); // Log error details
            });
    }, [amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!clientSecret) {
            setError('Client secret not set');
            return;
        }
        console.log('Client secret:', clientSecret); 
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else if (payload.paymentIntent.status === 'succeeded') {
            setError(null);
            setProcessing(false);
            setSuccess('Payment succeeded!');
            handlePaymentSuccess();
        }
    };

    const handlePaymentSuccess = () => {
        axios.put(`/api/factures/${factureId}`, { reste_a_payer: '0' })
            .then(response => {
                console.log('Facture updated successfully:', response.data);
                handlePaymentClick('0', factureId); // Update UI
            })
            .catch(error => {
                console.error('Error updating facture:', error);
            });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={processing} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {processing ? 'Processing...' : 'Payer'}
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
        </div>
    );
};

export default StripePayment;