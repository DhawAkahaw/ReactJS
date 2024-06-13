import React, { useState, useEffect } from 'react';

import Loading from './/Loading';
import axios from "axios";
import swal from 'sweetalert';
import { GovDeleg } from '../GovDeleg';

export default function Line() {
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        
        tel: '',
        rue: '',
        gouvernorat: '',
        delegation: '',
        localite: '',
        ville: '',
        code_postal: '',
        gsm: '',
        id: '',
        adsl_num:'',
        new_num_tel:'',
        prev_num:'',
        Remarque:'',
        Ticket:'',
        State:'',
        client_id:'',
        CIN:'',
        NOM:''
    });

    const [formSave, setFormSave] = useState({
        rue: '',
        gouvernorat: '',
        delegation: '',
        localite: '',
        ville: '',
        code_postal: '',
    });

    const [token, setToken] = useState('');
    const [sameAddress, setSameAddress] = useState(false);
 

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
                        tel: res.data.currentuser.tel,
                        gsm: res.data.currentuser.gsm,
                        login: res.data.currentuser.login,
                        password: res.data.currentuser.password,
                        id: res.data.currentuser._id
                    }));
                    setFormSave(prevState => ({
                        ...prevState,
                        rue: res.data.currentuser.rue,
                        gouvernorat: res.data.currentuser.gouvernorat,
                        delegation: res.data.currentuser.delegation,
                        localite: res.data.currentuser.localite,
                        ville: res.data.currentuser.ville,
                        code_postal: res.data.currentuser.code_postal,
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

            if (sameAddress) {
                Object.entries(formSave).forEach(([key, value]) => {
                    formDataToSend.append(key, value);
                });
            }

            const response = await axios.post(`api/Submitline/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                swal("", response.data.message, "success").then(() => {
        
                });
                setFormData({
                    rue: '',
                    gouvernorat: '',
                    delegation: '',                   
                    ville: '',
                    code_postal: '',
                    gsm: '',
                    id: '',
                    adsl_num:'',
                    new_num_tel:'',
                    prev_num:'',
                    Ticket:'',
                    State:'',
                    CIN:'',
                    NOM:''
                });
                setSameAddress(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [showInput, setShowInput] = useState(false);
    const handleRadioChange = (e) => {
        setShowInput(e.target.value === "Non");
    };

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


<div style={{ maxWidth: '100%' }}>
        <form className="row justify-content-center" onSubmit={handleSubmit}>
            {loading ? (
                <Loading />
                ) : (
                <>
                    <div className="col-md-12">                    
                        <div className="card mt-5">
                            <div className="card-body">
                                <div className="card shadow-sm">
                                    <div className="card-header text-center">
                                        <strong>Ajouter une nouvelle demande de transfert de ligne</strong>
                                    </div>

                                    <div className="card-body">
                                        <div className="mb-3 row">
                                            <div className="col-lg-3 col-md-3 col-form-label">Numéro ADSL *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                <select name="offre" className="form-control" required="true"  value={formData.adsl_num} onChange={(e) => setFormData({ ...formData, adsl_num: e.target.value })} >
                                                        <option value='0'>Choisir le numero</option>
                                                        <option value={formData.tel}>{formData.tel}</option>
                                                      
                                                    </select>
                                                </div>
                                            </div>
                                          </div>
                                          
                                         
                                         
                                          <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Nouveau numéro de téléphone * </div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                <input
                                                        type="text"
                                                        className="form-control"
                                                        name="num"
                                                        id="num"
                                                          
                                                        
                                                        value={formData.new_num_tel}
                                                        onChange={(e) => setFormData({ ...formData, new_num_tel: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                    
                                            <div className="row mt-3">
                                            
                                            <div className="col-lg-3 col-md-3 col-form-label">Vous êtes propriétaire de la ligne * </div>
                                            <div className="col-lg-9 col-md-9">
                                                
                                                <div className="text-left">
                                                    
                                                <input type="radio" value="Oui" name="prop" onChange={handleRadioChange} /> Oui
                                                <input type="radio" value="Non" name="prop" onChange={handleRadioChange} /> Non
                                                </div>
                                            </div>
                                        </div>




                                        {showInput && (
                                            
                                            <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Nom du propriétaire *</div>
                                            <div className="col-lg-9 col-md-9 mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Nom"
                                                    value={formData.NOM}
                                                    onChange={(e) => setFormData({ ...formData, NOM: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-form-label">CIN du propriétaire *</div>
                                            <div className="col-lg-9 col-md-9 mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="CIN"
                                                    value={formData.CIN}
                                                    onChange={(e) => setFormData({ ...formData, CIN: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        
                    
                                )}

                                              <div className="mb-3 row">
                                <label className="col-lg-3 col-md-3 col-form-label">Image</label>
                                <div className="col-lg-9 col-md-9">
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="picture"
                                        onChange={handleImage}
                                    />
                                </div>
                            </div>


                                            <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label"> </div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-left">
                                                <input type="checkbox" value="quest" id="mycheckbox" name="quest" onChange={(e) => setSameAddress(e.target.checked)}/> Voulez vous garder la même adresse?
                                                
                                                </div>
                                            </div>
                                        </div>


                            <div className="card mt-5">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Adresse actuelle</strong>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 col-form-label">Rue *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input
                                                    readOnly
                                                        type="text"
                                                        className="form-control"
                                                        name="rue"
                                                        id="rue"
                                                        value={formSave.rue}
                                                          
                                                        
                                                        
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Gouvernorat *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select name="gouvernorat" readOnly className="form-control"     value={formSave.gouvernorat} >
                                                        <option value=""  selected>{formSave.gouvernorat}</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Délégation *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select
                                                        name="delegation"
                                                        className="form-control"
                                                          
                                                        
                                                        value={formSave.delegation}
                                                        readOnly
                                                    >
                                                        <option value="" selected>{formSave.delegation}</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Ville *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="ville" id="ville" value={formSave.ville}     readOnly />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Code postal *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text" className="form-control" name="code_postal" id="code_postal" value={formSave.code_postal}     readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                          <div className="card mt-5">
                            <div className="card-body">
                                <div className="ibox float-e-margins">
                                    <div className="ibox-title mb-5">
                                        <strong>Nouvelle adresse</strong>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 col-form-label">Rue *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="rue"
                                                        id="rue"
                                                        value={formData.rue}
                                                          
                                                        
                                                        onChange={(e) => setFormData({ ...formData, rue: e.target.value })}
                                                        disabled={sameAddress}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Gouvernorat *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select name="gouvernorat" disabled={sameAddress} value={formData.gouvernorat}className="form-control"   aria-required="true"   onChange={(e) => setFormData({ ...formData, gouvernorat: e.target.value })}>
                                                        <option value=""  selected>Sélectionnez un gouvernorat</option>
                                                        {Object.keys(citiesByGovernorate).map((gov, index) => (
                                                            <option key={index} value={gov}>{gov}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Délégation *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <select
                                                        name="delegation"
                                                        className="form-control"
                                                          
                                                        
                                                        value={formData.delegation}
                                                        onChange={(e) => setFormData({ ...formData, delegation: e.target.value })}
                                                        disabled={sameAddress}
                                                    >
                                                        <option value="" selected>Sélectionnez une délégation</option>
                                                        {formData.gouvernorat && citiesByGovernorate[formData.gouvernorat] && citiesByGovernorate[formData.gouvernorat].map((deleg, index) => (
                                                            <option key={index} value={deleg}>{deleg}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Ville *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text"  disabled={sameAddress} className="form-control" name="ville" id="ville"      value={formData.ville}onChange={(e) => setFormData({ ...formData, ville: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-3 col-form-label">Code postal *</div>
                                            <div className="col-lg-9 col-md-9">
                                                <div className="text-right">
                                                    <input type="text"  className="form-control" name="code_postal" id="code_postal"      value={formData.code_postal} onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}disabled={sameAddress} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
 
                                        
                                    </div>
                                </div><div className="card-footer">
                        <div className="row justify-content-end">
                            <div className="col-sm-1 text-right">
                                <button type="submit" className="btn btn-primary btn-sm">Envoyer</button>
                            </div>
                        </div>
                    </div>
                            </div>
                        </div>
                        </div> 

                    
                    </>
            )}

        </form>

</div>



    );
}