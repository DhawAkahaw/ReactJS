import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const ContractPayment = ({ amount, factureId, handlePaymentClick }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => setError(err.message));
  }, [amount]);

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setDisabled(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setDisabled(false);
    } else {
      setError(null);
      setSucceeded(true);
      handlePaymentClick(factureId);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ fontSize: '18px' }}>
      <CardElement onChange={handleChange} />
      <button disabled={disabled || succeeded} style={{ marginTop: '20px', fontSize: '18px' }}>
        Pay
      </button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {succeeded && <div style={{ color: 'green', marginTop: '10px' }}>Payment succeeded!</div>}
    </form>
  );
};

export default ContractPayment;