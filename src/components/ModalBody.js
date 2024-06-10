import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import MaterialTable from 'material-table';
import OptionPayment from '../components/EspaceClient/OptionPayment';
import { loadStripe } from '@stripe/stripe-js';
import { Modal, Button } from 'react-bootstrap';
import tableIcons from './MaterialTableIcons';
import { Elements } from '@stripe/react-stripe-js';

const ModalBody = ({ data, contratId, onClose }) => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const [showPayment, setShowPayment] = useState(false);

    const stripePromise = loadStripe('pk_test_51PM93EP08thL8YjU0rYFxQHB7E0QvfefWS3YftiVXOb76yaefza5qau5RZ4W9dL3pAqMMAM68NJcyzIyg895aV8u00kSxVGtAd');

    const handlePaymentClick = (amount, option) => {
        setSelectedAmount(amount);
        setSelectedOption(option);
        setShowPayment(true);
    };
    

    const handlePaymentSuccess = () => {
        console.log('Payment successful'); // Add this line
        axios.post('/api/options', {
            contrat_id: contratId,
            designation: selectedOption.designation,
            prix: selectedOption.prix,
        })
        .then(response => {
            console.log('Option added successfully:', response.data);
            // Add any additional logic here
        })
        .catch(error => {
            console.error('Error adding option:', error);
            // Handle error
        });
    };

    const handleClosePayment = () => {
        setShowPayment(false);
    };

    const filteredOptions = data.map(option => {
        if (option.contrat_id === 'null') {
            const alreadyOwnedOption = data.find(otherOption => otherOption.designation === option.designation && otherOption.contrat_id === contratId);
            if (alreadyOwnedOption) {
                return alreadyOwnedOption;
            }
        }
        return option;
    }).filter((option, index, self) => 
        index === self.findIndex((t) => (
            t.designation === option.designation && (t.contrat_id === 'null' || t.contrat_id === contratId)
        ))
    );

    console.log(contratId);

    return (
        <div>
            <MaterialTable
                columns={[
                    { title: 'Option Name', field: 'designation' },
                    { title: 'Prix', field: 'prix' },
                    {
                        title: 'Action',
                        render: rowData => (
                            <div>
                                {rowData.contrat_id === contratId ? (
                                    <div className="alert alert-success">Already Owned</div>
                                ) : (
                                    <button className='btn' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}
                                        onClick={() => handlePaymentClick(rowData.prix, rowData)}>
                                        <i className="fas fa-credit-card" style={{ marginRight: '8px' }}></i>
                                        Acheter
                                    </button>

                                )}
                            </div>
                        )
                    },
                ]}
                data={filteredOptions}
                icons={tableIcons}
                title="Contract Options"
            />

            <Modal show={showPayment} onHide={handleClosePayment}>
                <Modal.Header closeButton>
                    <Modal.Title>Paiement par carte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showPayment && (
                        <Elements stripe={stripePromise}>
                            <OptionPayment amount={selectedAmount} contratId={contratId} handlePaymentSuccess={handlePaymentSuccess} />
                        </Elements>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePayment}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalBody;