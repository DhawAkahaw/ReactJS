import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
 
export default function Resetforgottenpassword() {



    const history = useHistory();

    const { id } = useParams();
    const [resetforgottenpasswordInput, setResetforgottenpassword] = useState({

        token: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setResetforgottenpassword({ ...resetforgottenpasswordInput, [e.target.name]: e.target.value });
    }

    const resetforgottenpasswordSubmit = (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (resetforgottenpasswordInput.password !== resetforgottenpasswordInput.password_confirmation) {
            swal("Erreur", "Les mots de passe ne correspondent pas", "error");
            return;
        }
    
        const data = {
            token: id,
            password: resetforgottenpasswordInput.password,
            password_confirmation: resetforgottenpasswordInput.password_confirmation
        }
    
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/reset-forgottenpassword', data).then(res => {
                if (res.data.status === 200) {
                    swal("Félicitations", res.data.message, "success");
                    history.push("/");
                } else {
                    setResetforgottenpassword({ ...resetforgottenpasswordInput, error_list: res.data.validation_errors });
                }
            });
        });
    }
    
    return (
        <div className='login-screen-box '>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="avatar" alt="User Avatar" />
            <h1>Réinitialiser votre mot de passe</h1>

            <div>
            <input name="password" onChange={handleInput} value={resetforgottenpasswordInput.password} autoComplete="on" className="form-control" placeholder="Nouveau mot de passe" type="password" required />
            <input name="password_confirmation" onChange={handleInput} value={resetforgottenpasswordInput.password_confirmation} autoComplete="on" className="form-control" placeholder="Confirmation du mot de passe" type="password" required />

                <button onClick={resetforgottenpasswordSubmit} type="submit">Réinitialiser le mot de passe</button>
 

            </div>
        </div>
    );
};

 