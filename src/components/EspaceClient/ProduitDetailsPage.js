import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import MaterialTable from 'material-table';
import tableIcons from '../MaterialTableIcons';
export default function ProduitDetails() {
    const location = useLocation();
    const produits = location.state?.produit || [];
    return (
        <div>
            <MaterialTable
                columns={[
                    {
                        title: 'Ref produit',
                        field: 'ref_produit_contrat'
                    },
                    {
                        title: 'Nom Commercial',
                        render: rowData => (
                            <span>{`${rowData.nom_commercial} (${rowData.reference})`}</span>
                        )
                    },
                    {
                        title: 'Référence',
                        field: 'reference'
                    },
                    {
                        title: 'Etat',
                        
                        render: rowData => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'green', marginRight: 8 }}></div>
                                <span style={{ color: 'green', textShadow: '0px 0px 10px green' }}>{rowData.etat}</span>
                            </div>
                        )
                    },
                    {
                        title: 'Etat Service',
                        field: 'etat_service'
                    },
                    
                ]}
                data={produits}
                title={<h4>Liste des Produits</h4>}
                icons={tableIcons}
                options={{
                    search: true,
                    paging: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 20],
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    }
                }}
            />
        </div>
    );
}