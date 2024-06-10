import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import axios from 'axios';
import swal from 'sweetalert';

export default function Migration() {
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
        Service: '',
        message: '',
        Ticket: '',
        State: '',
        client_id: '',
        Contract: '',
        current_offre: '',
        desired_offre: ''
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
                        code_Client: res.data.currentuser.code_Client,
                        type_Client: res.data.currentuser.type_Client,
                        id: res.data.currentuser._id,
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
                    desired_offre: "",
                    current_offre: '',
                    Contract: '',
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
                                <option value='0'>Choisir le contrat</option>
                                <option value={formData.tel}>{formData.tel}</option>
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
                                onChange={(e) => setFormData({ ...formData, current_offre: e.target.value })}
                            >
                                <option value=''>Choisir le Service</option>
                                <option value={formData.tel}>{formData.tel}</option>
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