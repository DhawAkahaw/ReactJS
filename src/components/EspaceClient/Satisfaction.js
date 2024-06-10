import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import axios from 'axios';
import swal from 'sweetalert';

export default function Satisfaction() {
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
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        client_id: '',
    });
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setToken(token);

        axios.get('api/currentuser')
            .then(res => {
                if (res.data.status === 200) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
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
                        id: res.data.currentuser._id,
                    }));
                    setLoading(false);
                } else if (res.data.status === 404) {
                    swal("", res.data.message, "error");
                }
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await axios.post(`api/SubmitSS/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                swal("", response.data.message, "success");

                setFormData(prevFormData => ({
                    ...prevFormData,
                    question1: '',
                    question2: '',
                    question3: '',
                    question4: '',
                    question5: '',
                }));
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
            <form onSubmit={handleSubmit}>
                <div className="card mt-5">
                    <div className="card-body">
                        <h5 className="card-title mb-4">Liste des Enquête de satisfaction</h5>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <label className="col-form-label">Quel est votre degré de satisfaction par rapport à la qualité de service TOPNET :</label>
                                <div className="form-check">
                                    <input type="radio" name="question1" value="Tout à fait satisfait" checked={formData.question1 === 'Tout à fait satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Tout à fait satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question1" value="Satisfait" checked={formData.question1 === 'Satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question1" value="Peu satisfait" checked={formData.question1 === 'Peu satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Peu satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question1" value="Pas du tout satisfait" checked={formData.question1 === 'Pas du tout satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Pas du tout satisfait</label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <label className="col-form-label">Quel est votre degré de satisfaction par rapport à notre application mobile :</label>
                                <div className="form-check">
                                    <input type="radio" name="question2" value="Tout à fait satisfait" checked={formData.question2 === 'Tout à fait satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Tout à fait satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question2" value="Satisfait" checked={formData.question2 === 'Satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question2" value="Peu satisfait" checked={formData.question2 === 'Peu satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Peu satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question2" value="4" checked={formData.question2 === '4'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Pas du tout satisfait</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <label className="col-form-label">Quel est votre degré de satisfaction par rapport à notre site web :</label>
                                <div className="form-check">
                                    <input type="radio" name="question3" value="Tout à fait satisfait" checked={formData.question3 === 'Tout à fait satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Tout à fait satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question3" value="Satisfait" checked={formData.question3 === 'Satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question3" value="Peu satisfait" checked={formData.question3 === 'Peu satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Peu satisfait</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question3" value="Pas du tout satisfait" checked={formData.question3 === 'Pas du tout satisfait'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Pas du tout satisfait</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <label className="col-form-label">Comptez-vous renouveler votre contrat ?</label>
                                <div className="form-check">
                                    <input type="radio" name="question4" value="Oui" checked={formData.question4 === 'Oui'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Oui</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question4" value="Non" checked={formData.question4 === 'Non'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Non</label>
                                </div>
                                
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <label className="col-form-label">Recommanderiez-vous Topnet à vos proches ?</label>
                                <div className="form-check">
                                    <input type="radio" name="question5" value="Oui" checked={formData.question5 === 'Oui'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Oui</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="question5" value="Non" checked={formData.question5 === 'Non'} onChange={handleInputChange} className="form-check-input" />
                                    <label className="form-check-label">Non</label>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                        
                    </div> <div className="card-footer">
                        <div className="row justify-content-end">
                            <div className="col-sm-1 text-right">
                                <button type="submit" className="btn btn-primary btn-sm">Envoyer</button>
                            </div>
                        </div>
                    </div>
                </div>
               
            </form>
        </div>
    );
}