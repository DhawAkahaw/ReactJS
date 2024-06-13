import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PQz2ECDzgLkZIsvgIzTxWozssoDyasZApYEnqsmNzTGfjyoy4jjNAzic30mHz6wrJDNEqrkP7KFUPpEm3gdWQEm00o4XVK3Pv');


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
            handlePaymentClick();
        }
    };

    





    const handlePaymentSuccess = () => {
        axios.put(`/api/factures/${factureId}`, { reste_a_payer: '0' })
            .then(response => {
                console.log('Facture updated successfully:', response.data);
                handlePaymentClick('0', factureId); // Update UI
                axios.get('api/currentuser')
                    .then(res => {
                    const userId = res.data.currentuser._id;
                    axios.post(`/api/addfauto/${userId}`)
                
                })
                .catch(error => {
                console.error('Error fetching current user:', error);
                });
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