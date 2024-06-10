import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from '../MaterialTableIcons';
import { Link } from 'react-router-dom';
import StripePayment from './StripePayment';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Factures() {
    const [factures, setFactures] = useState([]);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/factures/${userId}`)
                    .then(response => {
                        setFactures(response.data.facture);
                    })
                    .catch(error => {
                        console.error('Error fetching factures:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
            
    }, []);

    const VoirPDF = (e, pdf) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000${pdf}`)
    }

    const handlePaymentClick = (amount) => {
        setSelectedAmount(amount);
        setShowPayment(true);
    };

    const handleClose = () => setShowPayment(false);

    return (
        <div className="align-items-center justify-content-between mb-4">
            <MaterialTable
                columns={[
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Numero de facture</h6>,
                        field: 'numero_facture',
                        customFilterAndSearch: (term, rowData) => ((rowData.numero_facture).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Montant à payer</h6>,
                        field: 'montant_a_payer'
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Reste à payer</h6>,
                        field: 'reste_a_payer'
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Prise en charge</h6>,
                        field: 'prise_en_charge'
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Échéance</h6>,
                        field: 'echeance'
                    },
                    {
                        title: '',
                        render: rowData => (
                            <div>
                                {parseFloat(rowData.reste_a_payer) === 0 ? (
                                    <Link to='#' onClick={(e) => VoirPDF(e, rowData.pdf_facture)}>
                                        <button className='btn' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}>
                                            <i className="fas fa-eye" style={{ marginRight: '8px' }}></i>
                                            Visualiser
                                        </button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to='#' onClick={(e) => VoirPDF(e, rowData.pdf_facture)}>
                                            <button className='btn ' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}>
                                                <i className="fas fa-eye" style={{ marginRight: '8px' }}></i>
                                                Visualiser
                                            </button>
                                        </Link>
                                        <Link to="#" onClick={() => handlePaymentClick(rowData.reste_a_payer)}>
                                            <button className='btn mt-2' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}>
                                                <i className="fas fa-credit-card" style={{ marginRight: '8px' }}></i>
                                                Paiement par carte
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        )
                    }
                ]}
                data={factures}
                title={<h4 >Mes factures</h4>}
                icons={tableIcons}
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                }}
            />

            <Modal show={showPayment} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Paiement par carte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showPayment && <StripePayment amount={selectedAmount} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}