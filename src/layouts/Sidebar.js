import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {


    function toggleSection1(sectionId) {
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            if (section.id === sectionId) {
                if (section.style.display === 'none') {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            } else {
                section.style.display = 'none';
            }
        });
    }



    function toggleSection(sectionId) {
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = section.style.display === 'none' ? 'block' : 'none';
            } else {
                section.style.display = 'none';
            }
        });

        // Collapse all other collapsible elements
        const allCollapsibles = document.querySelectorAll('.collapse');
        allCollapsibles.forEach(collapsible => {
            if (collapsible.id !== sectionId) {
                collapsible.classList.remove('show');
            }
        });
    }

    return (
        <ul className="navbar-nav sidebar sidebar-dark" id="accordionSidebar" style={{ backgroundColor: '#1b2674' }}>
            <a className="sidebar-brand d-flex align-items-center justify-content-center mt-3" href="/espaceclient/dashboard">
                <div className="sidebar-brand-icon mt-4">
                    <img src="/img/topnetlogo.png" alt="Logo" style={{ maxWidth: '80%', height: 'auto' }} />
                </div>
            </a>

            <hr className="sidebar-divider my-0 mt-4" />

            <li className="nav-item active">
                <Link className="nav-link" to="/espaceclient/dashboard">
                    <i className="fa fa-home"></i>
                    <span>Tableau de bord</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <li className="nav-item">
                <Link className="nav-link" to="/espaceclient/profile">
                    <i className="fa fa-user" style={{ marginRight: '10px' }}></i>
                    <span>Mes informations</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/espaceclient/factures">
                    <i className="fa fa-credit-card" style={{ marginRight: '10px' }}></i>
                    <span>Factures</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/espaceclient/contrats">
                    <i className="fa fa-briefcase" style={{ marginRight: '10px' }}></i>
                    <span>Gérer mes contrats</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/espaceclient/gestion_mails">
                    <i className="fa fa-at" style={{ marginRight: '10px' }}></i>
                    <span>Gestion des mails</span>
                </Link>
            </li>
            
            {/* Assistance Section */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAssistance" aria-expanded="true" aria-controls="collapseAssistance" onClick={() => toggleSection('collapseAssistance')}>
                    <i className="fas fa-fw fa-hands-helping"></i>
                    <span>Assistance</span>
                </a>
                <div id="collapseAssistance" className="collapse" aria-labelledby="headingAssistance" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        {/* Réclamations */}
                        <a className="collapse-item" href="#" style={{ fontWeight: 'bold', color: '#f48404' }}onClick={() => toggleSection1('reclamations') } >Réclamations</a>
                        <div id="reclamations" className="section" style={{ display: 'none', paddingLeft: '20px' }}>
                            <Link className="collapse-item" to="/espaceclient/nouvelle_reclamation">Nouvelle réclamation</Link>
                            <Link className="collapse-item" to="/espaceclient/historique_reclamations">Historique</Link>
                        </div>

                        {/* Demandes */}
                        <a className="collapse-item" href="#" style={{ fontWeight: 'bold', color: '#f48404' }} onClick={() => toggleSection1('demandes') } >Demandes</a>
                        <div id="demandes" className="section" style={{ display: 'none', paddingLeft: '20px' }}>
                            <Link className="collapse-item" to="/espaceclient/nouvelle_demande">Nouvelle demande</Link>
                            <Link className="collapse-item" to="/espaceclient/historique_demandes">Historiques</Link>
                        </div>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="#collapseMigration" data-toggle="collapse" aria-expanded="true" onClick={() => toggleSection('collapseMigration') }>
                    <i className="fas fa-step-forward"></i>
                    <span>Migration d’offre</span>
                </a>
                <div id="collapseMigration" className="collapse">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" to="/espaceclient/nouvelle_demande_migration" style={{ fontWeight: 'bold', color: '#f48404' }}>Nouvelle demande</Link>
                        <Link className="collapse-item" to="/espaceclient/historique_demandes_migration" style={{ fontWeight: 'bold', color: '#f48404' }}>Historique</Link>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="#collapseTransfert" data-toggle="collapse" aria-expanded="true" onClick={() => toggleSection('collapseTransfert') }>
                    <i className="fas fa-fw fa-exchange-alt"></i>
                    <span>Transfert de ligne</span>
                </a>
                <div id="collapseTransfert" className="collapse">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" to="/espaceclient/nouvelle_demande_transfert_ligne" style={{ fontWeight: 'bold', color: '#f48404' }}>Nouvelle demande</Link>
                        <Link className="collapse-item" to="/espaceclient/historique_demandes_transfert_ligne" style={{ fontWeight: 'bold', color: '#f48404' }}>Historique</Link>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="#collapseSuggestion" data-toggle="collapse" aria-expanded="true"onClick={() => toggleSection('collapseSuggestion') }>
                    <i className="fa fa-comment"></i>
                    <span>Suggestions</span>
                </a>
                <div id="collapseSuggestion" className="collapse">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" to="/espaceclient/nouvelle_demande_suggestion" style={{ fontWeight: 'bold', color: '#f48404' }}>Nouvelle suggestion</Link>
                        <Link className="collapse-item" to="/espaceclient/historique_demandes_suggestion" style={{ fontWeight: 'bold', color: '#f48404' }}>Historique</Link>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/espaceclient/satisfaction">
                    <i className="far fa-smile" style={{ marginRight: '10px' }}></i>
                    <span>Enquête de satisfaction</span>
                </Link>
            </li>
        </ul>
    );
};

export default Sidebar;
