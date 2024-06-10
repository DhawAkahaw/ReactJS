import React, { useState, useEffect } from 'react';

 import Loading from '../Loading';
 import axios from "axios";
import swal from 'sweetalert';

import { GovDeleg } from './GovDeleg';

export default function Profile() {
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
        id: ''
    });
    const [token, setToken] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        // Fetch current user data
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
                    // If user not found, show an error message
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
            picture: e.target.files[0]
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            formDataToSend.append('picture', formData.picture);

            const response = await axios.post(`api/update_profile/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                swal("", response.data.message, "success");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to get cities by governorate
    function getCitiesByGovernorate(data) {
        const citiesByGovernorate = {};
        data.forEach(entry => {
            const { Gov, Deleg } = entry;
            if (!citiesByGovernorate[Gov]) {
                citiesByGovernorate[Gov] = [Deleg];
            } else {
                if (!citiesByGovernorate[Gov].includes(Deleg)) {
                    citiesByGovernorate[Gov].push(Deleg);
                }
            }
        });
        return citiesByGovernorate;
    }

    const citiesByGovernorate = getCitiesByGovernorate(GovDeleg);


    if (loading) {
        <Loading />
    }

    return (



        <form className="row justify-content-center" onSubmit={handleSubmit}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="col-md-12">
                        <div className="card mt-5">
                            <div className="card-body">
                                <div className="ibox float-e-margin">
                                    <div className="ibox-title mb-5">
                                        <strong>Informations du client</strong>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            Nom
                                        </div>

                                        <div className="col-md-6 text-right">
                                            {formData.name}
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            Prénom
                                        </div>

                                        <div className="col-md-6 text-right">
                                            {formData.lastName}
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            Code client
                                        </div>

                                        <div className="col-md-6 text-right">
                                            {formData.code_Client}
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            Type du client
                                        </div>

                                        <div className="col-md-6 text-right">
                                            {formData.type_Client}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-5">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Informations du compte</strong>
                                    </div>
                                    <div className="ibox-content no-padding">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3">Rue</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="rue"
                                                        id="rue"
                                                        value={formData.rue}
                                                        required=""
                                                        aria-required="true"
                                                        onChange={(e) => setFormData({ ...formData, rue: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Gouvernorat</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select name="gouvernorat" className="form-control" required="" aria-required="true" value={formData.gouvernorat} onChange={(e) => setFormData({ ...formData, gouvernorat: e.target.value })}>
                                                        <option value="" disabled selected>Sélectionnez un gouvernorat</option>
                                                        {Object.keys(citiesByGovernorate).map((gov, index) => (
                                                            <option key={index} value={gov}>{gov}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Délégation</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select
                                                        name="delegation"
                                                        className="form-control"
                                                        required=""
                                                        aria-required="true"
                                                        value={formData.delegation}
                                                        onChange={(e) => setFormData({ ...formData, delegation: e.target.value })}
                                                    >
                                                        <option value="" disabled selected>Sélectionnez une délégation</option>
                                                        {formData.gouvernorat && citiesByGovernorate[formData.gouvernorat] && citiesByGovernorate[formData.gouvernorat].map((deleg, index) => (
                                                            <option key={index} value={deleg}>{deleg}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Ville</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="ville" id="ville" value={formData.ville} required="" aria-required="true" onChange={(e) => setFormData({ ...formData, ville: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Code postal</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="code_postal" id="code_postal" value={formData.code_postal} required="" aria-required="true" onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card ">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Numéros de contact</strong>
                                    </div>
                                    <div className="ibox-content no-padding">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3">Tél</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="tel" id="tel" value={formData.tel} required="" aria-required="true" onChange={(e) => setFormData({ ...formData, tel: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">GSM</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="gsm" id="gsm" value={formData.gsm} required="" aria-required="true" onChange={(e) => setFormData({ ...formData, gsm: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-5 ">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Paramètres du compte</strong>
                                    </div>
                                    <div className="ibox-content no-padding">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3">Login / Email principal</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="email" className="form-control" name="login" id="login" value={formData.login} required="" aria-required="true" onChange={(e) => setFormData({ ...formData, login: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3">Mot de passe</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="password" className="form-control" name="password" id="password" value={formData.password} required="" aria-required="true" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-5 ">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Photo de profil</strong>
                                    </div>
                                    <div className="ibox-content no-padding">
                                        <div className="row">

                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">

                                                    <input type="file" name="picture" onChange={handleImage} />                                        </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-4 mt-5 text-right'>
                        <button type="submit" >Modifier</button>
                    </div>
                    </>
            )}

        </form>





    );
}