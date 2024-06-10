import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Navbar() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    useEffect(() => {
        const clientString = localStorage.getItem('auth_client');
        const client = JSON.parse(clientString);

        if (client) {
            setFirstName(client.name);
            setLastName(client.last_name);
        }
    }, []); 

    useEffect(() => {
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
    }, [firstName, lastName]);

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                window.location.reload();
            }
        });
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2  d-lg-inline text-gray-600 small">{firstName} {lastName}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" to="/espaceclient/profile">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Mes informations
                        </a>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" data-toggle="modal" data-target="#logoutModal"  onClick={logoutSubmit}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Se déconnecter
                        </Link>
                    </div>
                </li>
            </ul>
        </nav>
    );
}