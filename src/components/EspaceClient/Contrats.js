import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import tableIcons from '../MaterialTableIcons';
import { Modal,} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css'; // Ensure this path is correct and this import is last
import ModalBody from '../ModalBody'; // Import the ModalBody component

export default function Contract() {
    const [contracts, setContracts] = useState([]);
    const [option, setOption] = useState([]);
    const [produit, setProduit] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedContractId, setSelectedContractId] = useState(null); // State variable to store the selected contract ID

    useEffect(() => {
        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/produit/${userId}`)
                    .then(response => {
                        // Set produit here if needed
                    })
                    .catch(error => {
                        console.error('Error fetching produit:', error);
                    });
                axios.get(`api/produit`)
                    .then(response => {
                        setProduit(response.data.produit);
                    })
                    .catch(error => {
                        console.error('Error fetching produit:', error);
                    });

                axios.get(`api/option`)
                    .then(response => {
                        setOption(response.data.option);
                    })
                    .catch(error => {
                        console.error('Error fetching Options contrats:', error);
                    });
           
                axios.get(`api/contract/${userId}`)
                    .then(response => {
                        const contractsData = response.data.contract.map(contract => ({
                            ...contract,
                            etat: contract.etat === '1' ? 'En cours' : 'Other state',
                        }));
                        setContracts(contractsData);
                    })
                    .catch(error => {
                        console.error('Error fetching contracts:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);

    const handleOptionsClick = (contractId) => {
        setShowModal(true);
        setSelectedContractId(contractId); // Set the selected contract ID
    };

    return (
        <div className="align-items-center justify-content-between mb-4">
            <MaterialTable
                columns={[
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Référence contrat</h6>,
                        field: 'reference_contrat',
                        customFilterAndSearch: (term, rowData) => ((rowData.reference_contrat).toLowerCase()).indexOf(term.toLowerCase()) !== -1,
                        render: rowData => (
                            <div>
                                <span>{rowData.reference_contrat}</span>
                                <div style={{ marginTop: '8px' }}>
                                    <Link to={{ pathname: '/espaceclient/produit-details', state: { produit: produit.filter(p => p.reference_contrat === rowData._id) } }}>
                                        <button className='btn' style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}>
                                            Visualiser
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Désignation</h6>,
                        field: 'designation'
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Date de début</h6>,
                        field: 'date_de_debut'
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Etat</h6>,
                        render: rowData => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'green', marginRight: 8 }}></div>
                                <span style={{ color: 'green', textShadow: '0px 0px 10px green' }}>{rowData.etat}</span>
                            </div>
                        )
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Options à activer</h6>,
                        render: rowData => (
                            <div>
                                <button
                                    className='btn'
                                    style={{ borderRadius: 19, borderColor: '#18a6f0', backgroundColor: '#18a6f0', color: "#fff" }}
                                    onClick={() => handleOptionsClick(rowData._id)} // Pass the contract ID here
                                >
                                    <i className="fas fa-eye" style={{ marginRight: '8px' }}></i>
                                    Options
                                </button>
                            </div>
                        )
                    }
                ]}
                data={contracts}
                title={<h4>Mes Contracts</h4>}
                icons={tableIcons}
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                }}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="custom-modal-dialog">
                <Modal.Header closeButton>
                    <Modal.Title>Options à activer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedContractId && (
                        <ModalBody data={option} contratId={selectedContractId} onClose={() => setShowModal(false)} /> // Pass selectedContractId to ModalBody
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}