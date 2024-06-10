import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import axios from 'axios';
import swal from 'sweetalert';

export default function Migration() {
    const [loading, setLoading] = useState(true);
    const [produits, setProduits] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        tel: '',
        rue: '',
        gouvernorat: '',
        delegation: '',
        localite: '',
        ville: '',
        code_postal: '',
        gsm: '',
        login: '',
        password: '',
        code_Client: '',
        type_Client: '',
        id: '',
        Service: '',
        message: '',
        Ticket: '',
        State: '',
        client_id: '',
        Contract: '',
        current_offre: '',
        desired_offre: '',
    });
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setToken(token);
        
        const fetchData = async () => {
            try {
                const userRes = await axios.get('api/currentuser');
                if (userRes.data.status === 200) {
                    const user = userRes.data.currentuser;
                    setFormData(prevState => ({
                        ...prevState,
                        name: user.name,
                        lastName: user.last_name,
                        rue: user.rue,
                        gouvernorat: user.gouvernorat,
                        delegation: user.delegation,
                        localite: user.localite,
                        ville: user.ville,
                        code_postal: user.code_postal,
                        tel: user.tel,
                        gsm: user.gsm,
                        login: user.login,
                        password: user.password,
                        code_Client: user.code_Client,
                        type_Client: user.type_Client,
                        id: user._id,
                    }));

                    const produitRes = await axios.get('api/produit');
                    if (produitRes.data.status === 200) {
                        setProduits(produitRes.data.produit);
                    } else {
                        swal("", produitRes.data.message, "error");
                    }
                    setLoading(false);
                } else if (userRes.data.status === 404) {
                    swal("", userRes.data.message, "error");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Update current_offre based on Contract
    useEffect(() => {
        if (formData.Contract) {
            const selectedContract = produits.find(produit => produit.nom_commercial === formData.Contract);
            if (selectedContract) {
                setFormData(prevState => ({
                    ...prevState,
                    current_offre: selectedContract.nom_commercial
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                current_offre: ''
            }));
        }
    }, [formData.Contract, produits]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await axios.post(`api/Submitmigration/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                swal("", response.data.message, "success");
                setFormData({
                    ...formData,
                    desired_offre: '',
                    current_offre: '',
                    Contract: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <form style={{ maxWidth: '100%' }} onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-header text-center">
                    <h4>Ajouter une nouvelle demande de migration de l'offre</h4>
                </div>
                <div className="card-body">
                    <div className="mb-3 row">
                        <label className="col-lg-3 col-md-3 col-form-label">Contract *</label>
                        <div className="col-lg-9 col-md-9">
                            <select 
                                name="Contract" 
                                className="form-control" 
                                required 
                                value={formData.Contract} 
                                onChange={(e) => setFormData({ ...formData, Contract: e.target.value })}
                            >
                                <option value=''>Choisir le contrat</option>
                                {produits && produits.map((produit, index) => (
                                    <option key={index} value={produit.nom_commercial}>{produit.nom_commercial} ({produit.reference})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label className="col-lg-3 col-md-3 col-form-label">Offre actuelle *</label>
                        <div className="col-lg-9 col-md-9">
                            <select 
                                name="current_offre" 
                                className="form-control" 
                                required 
                                value={formData.current_offre} 
                                disabled
                            >
                                <option value=''>Choisir le Service</option>
                                {formData.Contract && (
                                    <option value={formData.current_offre}>{formData.current_offre}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label className="col-lg-3 col-md-3 col-form-label">Offre cible *</label>
                        <div className="col-lg-9 col-md-9">
                            <select 
                                name="desired_offre" 
                                className="form-control" 
                                required 
                                value={formData.desired_offre} 
                                onChange={(e) => setFormData({ ...formData, desired_offre: e.target.value })}
                            >
                                <option value=''>Choisir l'offre</option>
                                <option value='Fidélité SMART RAPIDO 100M (sans voix)'>Fidélité SMART RAPIDO 100M (sans voix)</option>
                                <option value='Fidélité SMART RAPIDO 20M (Sans Voix)'>Fidélité SMART RAPIDO 20M (Sans Voix)</option>
                                <option value='Fidélité SMART RAPIDO 30M (sans voix)'>Fidélité SMART RAPIDO 30M (sans voix)</option>
                                <option value='PROMO SMART ADSL 10M'>PROMO SMART ADSL 10M</option>
                                <option value='PROMO SMART ADSL 12M'>PROMO SMART ADSL 12M</option>
                                <option value='PROMO SMART ADSL 20M'>PROMO SMART ADSL 20M</option>
                                <option value='PROMO SMART RAPIDO 20M (Sans Voix)'>PROMO SMART RAPIDO 20M (Sans Voix)</option>
                                <option value='PROMO SMART RAPIDO 30M (Sans Voix)'>PROMO SMART RAPIDO 30M (Sans Voix)</option>
                                <option value='SMART ADSL 10M'>SMART ADSL 10M</option>
                                <option value='SMART ADSL 12M'>SMART ADSL 12M</option>
                                <option value='SMART ADSL 20M'>SMART ADSL 20M</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row justify-content-end">
                        <div className="col-sm-1 text-right">
                            <button type="submit" className="btn btn-primary btn-sm">Envoyer</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
