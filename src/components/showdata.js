import React, { useState, useEffect } from 'react';
 
import Error from '../Error';
import Loading from '../Loading';
import Success from '../Success';
import axios from "axios";

 

export default function Profile() {
  const [Nom, setNom] = useState('');
  const [lastName, setLastName] = useState('');
  const [Tel, setTel] = useState('');
  const [Code_c, setCodec] = useState('');
  const [Type_c, setTypec] = useState('');
  

  useEffect(() => {
     const clientString = localStorage.getItem('auth_client');
     const client = JSON.parse(clientString);

     if (client) {
        setNom(client.name);
        setLastName(client.last_name);
        setCodec(client.code_Clfient);
        setTel(client.tel);
        setTypec(client.type_Client);
    }
}, []); 
 

    return (


        
        <div className="row justify-content-center">
        <div className="col-md-12">
      
     
            <div className="card">
                <div className="card-header">
                    <h3>Informations du client</h3>
                </div>
                <div className="card-body">
     
                        <div className="row">
                            <div className="col-md-6">
                                Nom 
                              
                            </div>
    
                            <div className="col-md-6">
                                <input type="text" name="name" className="form-control"  value={Nom} onChange={(e) => setNom(e.target.value)}/>
                                
                            </div>
                        </div>
    
                        <div className="row mt-3">
                            <div className="col-md-6">
                                prenom 
                              
                            </div>
    
                            <div className="col-md-6">
                                <input type="text" name="lastName" className="form-control"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                
                            </div>
                        </div>
    
                        <div className="row mt-3">
                            <div className="col-md-6">
                                Code client 
                              
                            </div>
    
                            <div className="col-md-6">
                                <input type="text" name="code_c" className="form-control"  value={Code_c} onChange={(e) => setCodec(e.target.value)}/>
                                
                            </div>
                        </div>


                        <div className="row mt-3">
                            <div className="col-md-6">
                                Type du client 
                              
                            </div>
    
                            <div className="col-md-6">
                                <input type="text" name="typec" className="form-control"  value={Type_c} onChange={(e) => setTypec(e.target.value)}/>
                                
                            </div>
                        </div>


        
    
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="file" className="form-control file-upload-info " placeholder="Télécharger une image" name="image"/>
                                    <span className="input-group-append">
    
                                    </span>
                                  
                                </div>
                            </div>
    
                            
                        </div>
    
                        
                        
    
                        
    
                        <div className="col-md-1">
                        <button type="submit" className="btn btn-primary mr-2">Modifier</button>
                        </div>

    
    
                 </div>
            </div>

            <div className="card">
                            <div className="card-header">
                                <h3>Informations du compte</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                <div className="col-md-6">
                                    Nom 
                                
                                </div>
        
                                <div className="col-md-6">
                                    <input type="text" name="name" className="form-control"  value={Nom} onChange={(e) => setNom(e.target.value)}/>
                                    
                                </div>









                                
                        </div>

                            </div> 
                            
                        </div>



        </div>
    </div>

    );
}