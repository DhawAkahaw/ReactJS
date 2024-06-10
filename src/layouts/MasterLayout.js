import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../routes/routes.js'; 

import '../dashboard_assets/css/sb-admin-2.min.css';
import '../dashboard_assets/vendor/fontawesome-free/css/all.min.css';
import '../dashboard_assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
 
const MasterLayout = () => {
    return (
        <div id='page-top'>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Navbar/>
                        <div className="container-fluid">
                        <div className="align-items-center justify-content-between mb-4">
                                <Switch>
                                    {routes.map((route, idx) => (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <route.component {...props} />
                                            )}
                                        />
                                    ))}
                                    <Redirect from="espaceclient" to="/espaceclient/dashboard"/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default MasterLayout;