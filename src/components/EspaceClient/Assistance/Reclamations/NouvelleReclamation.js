import React, { useState, useEffect, useRef } from 'react';
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
        offre:'',
        Service:'',
        Category:'',
        Motif_rec:'',
        Image:null,
        Message:'',
        Ticket:'',
        State:'',
        client_id:''
    });
    const [token, setToken] = useState('');

    // Create a reference for the file input
    const fileInputRef = useRef(null);

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
                        Image: res.data.currentuser.Image,
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

    const handleImage = (e) => {
        setFormData(prevState => ({
            ...prevState,
            Image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            formDataToSend.append('Image', formData.Image);
            const response = await axios.post(`api/Submitreclamation/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                swal("", response.data.message, "success");
                setFormData({
                    offre:'',
                    Service:'',
                    Category:'',
                    Motif_rec:'',
                    Image:null,
                    Message:'',
                });
                // Reset the file input field
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div style={{ maxWidth: '100%' }}>
            <form className="row justify-content-center" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header text-center">
                            <h4>Ajouter une nouvelle réclamation</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label className="col-lg-3 col-md-3 col-form-label">Offre*</label>
                                <div className="col-lg-9 col-md-9">
                                    <select
                                        name="offre"
                                        className="form-control"
                                        required
                                        value={formData.offre}
                                        onChange={(e) => setFormData({ ...formData, offre: e.target.value })}
                                    >
                                        <option value="0" selected>Choisir l'Offre</option>
                                        <option value={formData.tel}>{formData.tel}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-lg-3 col-md-3 col-form-label">Service*</label>
                                <div className="col-lg-9 col-md-9">
                                    <select
                                        name="Service"
                                        className="form-control"
                                        required
                                        value={formData.Service}
                                        onChange={(e) => setFormData({ ...formData, Service: e.target.value })}
                                    >
                                        <option value="0" selected>Choisir le Service</option>
                                        <option value="Commerciale">Commerciale</option>
                                        <option value="Technique">Technique</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-lg-3 col-md-3 col-form-label">Categorie*</label>
                                <div className="col-lg-9 col-md-9">
                                    <select
                                        name="categorie"
                                        className="form-control"
                                        required
                                        value={formData.Category}
                                        onChange={(e) => setFormData({ ...formData, Category: e.target.value })}
                                    >
                                        <option value="0" selected>Sélectionnez une categorie</option>
                                        <option value="Generalite">Generalite</option>
                                        <option value="ADSL&Options">ADSL&Options</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-lg-3 col-md-3 col-form-label">Motif de réclamation*</label>
                                <div className="col-lg-9 col-md-9">
                                    <select
                                        name="Motif"
                                        className="form-control"
                                        required
                                        value={formData.Motif_rec}
                                        onChange={(e) => setFormData({ ...formData, Motif_rec: e.target.value })}
                                    >
                                        <option value="0" selected>Sélectionnez un motif</option>
                                        <option value="Facture non conforme (prix non adéquat)">Facture non conforme (prix non adéquat)</option>
                                        <option value="Non réception facture">Non réception facture</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-lg-3 col-md-3 col-form-label">Image</label>
                                <div className="col-lg-9 col-md-9">
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="Image"
                                        onChange={handleImage}
                                        ref={fileInputRef} // Add the ref here
                                    />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-lg-3 col-md-3 col-form-label">Numéro GSM</label>
                                <div className="col-lg-9 col-md-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="gsm"
                                        id="gsm"
                                        required
                                        value={formData.gsm}
                                        onChange={(e) => setFormData({ ...formData, gsm: e.target.value })}
                                    />
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
                </div>
            </form>
        </div>
    );
}