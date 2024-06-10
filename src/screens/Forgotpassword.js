import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
 

export default function Forgotpassword() {

    const history = useHistory();

    const [forgotpasswordInput, setForgotpassword] = useState({

        login: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setForgotpassword({ ...forgotpasswordInput, [e.target.name]: e.target.value });
    }

    const forgotpasswordSubmit = (e) => {
        e.preventDefault();

        const data = {
            login: forgotpasswordInput.login,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/forgot-password', data).then(res => {

                if (res.data.status === 200) {

                    swal("Félicitations", res.data.message, "success");
                    history.push("/");

                } else if (res.data.status === 401) {

                    swal("Attention", res.data.message, "warning");
                } else {
                    setForgotpassword({ ...forgotpasswordInput, error_list: res.data.validation_errors });
                }
            });
        });



    }


    return (
        <div className='login-screen-box '>
             <h1>Réinitialiser votre mot de passe</h1>

            <div>
               
            <input onChange={handleInput} value={forgotpasswordInput.login} name="login" type="email" className="form-control" placeholder="Email" a-label="Email" aria-describedby="email-addon" required />                
            
                <button onClick={forgotpasswordSubmit} type="submit">Envoyer </button>

             


            </div>
        </div>
    );
};

 