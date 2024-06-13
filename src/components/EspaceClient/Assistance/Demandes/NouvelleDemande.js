import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import axios from "axios";
import swal from 'sweetalert';


export default function Reclamation() {
    const [loading, setLoading] = useState(true);
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
        offre: '',
        Service: '',
        Category: '',
        Motif_rec: '',
        Image: '',
        Message: '',
        Ticket: '',
        State: '',
        client_id: '',
        Reference: '',
        Motif_demand: '',
        clientId: '',
    });
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        axios.get('api/currentuser')
            .then(res => {
                if (res.data.status === 200) {
                    setFormData(prevState => ({
                        ...prevState,
                        name: res.data.currentuser.name,
                        lastName: res.data.currentuser.last_name,
                        rue: res.data.currentuser.rue,
                        gouvernorat: res.data.currentuser.gouvernorat,
                        delegation: res.data.currentuser.delegation,
                        localite: res.data.currentuser.localite,
                        ville: res.data.currentuser.ville,
                        code_postal: res.data.currentuser.code_postal,
                        tel: res.data.currentuser.tel,
                        gsm: res.data.currentuser.gsm,
                        login: res.data.currentuser.login,
                        password: res.data.currentuser.password,
                        picture: res.data.currentuser.picture,
                        code_Client: res.data.currentuser.code_Client,
                        type_Client: res.data.currentuser.type_Client,
                        id: res.data.currentuser._id
                    }));
                    setToken(token);
                    setLoading(false);
                } else if (res.data.status === 404) {
                    swal("", res.data.message, "error");
                }
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            
            const response = await axios.post(`api/Submitdemand/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                swal("", response.data.message, "success");
                setFormData({
                    Reference: '',
                    Motif_demand: '',
                    Message: '',
                    clientId: '',
                    Tel:''
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
                    <h4>Ajouter une nouvelle demande</h4>
                </div>
                <div className="card-body">
                    <div className="mb-3 row">
                        <label className="col-lg-3 col-md-3 col-form-label">Numéro ADSL *</label>
                        <div className="col-lg-9 col-md-9">
                            <select 
                                name="adsl" 
                                className="form-control" 
                                required 
                                value={formData.Reference} 
                                onChange={(e) => setFormData({ ...formData, Reference: e.target.value })}
                            >
                                <option value='0' selected>Choisir le numéro...</option>
                                <option value={formData.tel}>{formData.tel}</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label className="col-lg-3 col-md-3 col-form-label">Motif demande *</label>
                        <div className="col-lg-9 col-md-9">
                            <select 
                                name="motif" 
                                className="form-control" 
                                required 
                                value={formData.Motif_demand} 
                                onChange={(e) => setFormData({ ...formData, Motif_demand: e.target.value })}
                            >
                                <option value='0' selected>Choisir le motif demande...</option>
                                <option value="Demande Activation IPv6">Demande Activation IPv6</option>
                                <option value="Demande de suspension">Demande de suspension</option>
                                <option value="Demande édition facture">Demande édition facture</option>
                                <option value="Demande de paramètres">Demande de paramètres</option>
                                <option value="Demande changement de raison sociale">Demande changement de raison sociale</option>
                                <option value="Demande d’annulation de suspension">Demande d’annulation de suspension</option>
                                <option value="Demande réactivation abonnement">Demande réactivation abonnement</option>
                                <option value="Demande changement de fréquence de facturation">Demande changement de fréquence de facturation</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="Message" className="col-lg-3 col-md-3 col-form-label">Message</label>
                        <div className="col-lg-9 col-md-9">
                            <textarea
                                id="Message"
                                name="Message"
                                className="form-control"
                                rows="5"
                                value={formData.Message}
                                onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
                            />
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