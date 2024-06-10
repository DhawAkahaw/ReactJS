import Dashboard from "../components/EspaceClient/Dashboard";
import Factures from "../components/EspaceClient/Factures";
import Profile from "../components/EspaceClient/Profile";
import Contrats from "../components/EspaceClient/Contrats";
import GestionMails from "../components/EspaceClient/GestionMails";
import ProduitDetailsPage from '../components/EspaceClient/ProduitDetailsPage'; 
//Assistance
import NouvelleReclamation from "../components/EspaceClient/Assistance/Reclamations/NouvelleReclamation";
import HistoriqueDemandes from "../components/EspaceClient/Assistance/Demandes/HistoriqueDemandes";
import NouvelleDemande from "../components/EspaceClient/Assistance/Demandes/NouvelleDemande";
import HistoriqueReclamations from "../components/EspaceClient/Assistance/Reclamations/HistoriqueReclamations";

//Migration
import NouvelleDemandeMigration from '../components/EspaceClient/Migrations/NouvelleDemandeMigration';
import HistoriqueDemandesMigration from '../components/EspaceClient/Migrations/HistoriqueDemandesMigration';

//Transfert Ligne
import NouvelleDemandeTransfert from '../components/EspaceClient/TransfertLigne/NouvelleDemandeTransfert';
import HistoriqueDemandesTransfert from '../components/EspaceClient/TransfertLigne/HistoriqueDemandesTransfert';

//Suggestion
import NouvelleSuggestion from '../components/EspaceClient/Suggestion/NouvelleSuggestion';
import HistoriqueDemandesSuggestion from '../components/EspaceClient/Suggestion/HistoriqueDemandesSuggestion';

//Satisfaction
import Satisfaction from '../components/EspaceClient/Satisfaction';



const routes =  [

    //****Espace Client Routes****

    {path : '/espaceclient', exact: true, name: 'espaceclient'},
    {path: '/espaceclient/dashboard', exact:true, name:'Dashboard', component:Dashboard},
    {path: '/espaceclient/profile', exact:true, name:'Profile', component:Profile},
    {path: '/espaceclient/factures', exact:true, name:'Factures', component:Factures},
    {path: '/espaceclient/contrats', exact:true, name:'Contrats', component:Contrats},
    {path: '/espaceclient/gestion_mails', exact:true, name:'GestionMails', component:GestionMails},
    
    //Assistance routes
    {path: '/espaceclient/nouvelle_reclamation', exact:true, name:'NouvelleReclamation', component:NouvelleReclamation},
    {path: '/espaceclient/historique_reclamations', exact:true, name:'HistoriqueReclamations', component:HistoriqueReclamations},
    {path: '/espaceclient/nouvelle_demande', exact:true, name:'NouvelleDemande', component:NouvelleDemande},
    {path: '/espaceclient/historique_demandes', exact:true, name:'HistoriqueDemandes', component:HistoriqueDemandes},
   
   
    //Migration routes
    {path: '/espaceclient/nouvelle_demande_migration', exact:true, name:'NouvelleDemandeMigration', component:NouvelleDemandeMigration},
    {path: '/espaceclient/historique_demandes_migration', exact:true, name:'HistoriqueDemandesMigration', component:HistoriqueDemandesMigration},

    //Transfert Ligne routes
    {path: '/espaceclient/nouvelle_demande_transfert_ligne', exact:true, name:'NouvelleDemandeTransfert', component:NouvelleDemandeTransfert},
    {path: '/espaceclient/historique_demandes_transfert_ligne', exact:true, name:'HistoriqueDemandesTransfert', component:HistoriqueDemandesTransfert},

    //Suggestion routes
    {path: '/espaceclient/nouvelle_demande_suggestion', exact:true, name:'NouvelleSuggestion', component:NouvelleSuggestion},
    {path: '/espaceclient/historique_demandes_suggestion', exact:true, name:'HistoriqueDemandesSuggestion', component:HistoriqueDemandesSuggestion},

    //Satisfaction route
    {path: '/espaceclient/satisfaction', exact:true, name:'Satisfaction', component:Satisfaction},

    {path: '/espaceclient/produit-details', exact:true, name:'ProduitDetailsPage', component:ProduitDetailsPage},

]

export default routes;