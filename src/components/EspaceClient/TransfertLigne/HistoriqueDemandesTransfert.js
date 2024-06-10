import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons'; // Import tableIcons from its file

export default function Line() {
    const [line, setLine] = useState([]);

    useEffect(() => {
        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/LineHistory/${userId}`)
                    .then(response => {
                        setLine(response.data.line);
                    })
                    .catch(error => {
                        console.error('Error fetching line:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(-2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    return (
        <div className="align-items-center justify-content-between mb-4">
            <MaterialTable
                columns={[
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Ticket</h6>,
                        render: rowData => <p>{rowData.Ticket}</p>,
                        customFilterAndSearch: (term, rowData) => ((rowData.Ticket).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Ancien numéro de téléphone</h6>,
                        render: rowData => <p>{rowData.prev_num}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Nouveau numéro de téléphone</h6>,
                        render: rowData => <p>{rowData.new_num_tel}</p>
                    }, {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Date de création	</h6>,
                        render: rowData => <p>{formatDate(rowData.created_at)}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Etat</h6>,
                        render: rowData => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'green', marginRight: 8 }}></div>
                                <span style={{ color: 'green', textShadow: '0px 0px 10px green' }}>{rowData.State}</span>
                            </div>
                        )
                    },
                   
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Remarque</h6>,
                        render: rowData => <p>{rowData.Remarque}</p>
                    },
                   
                ]}
                data={line}
                title={<h4>Historique des demandes de transfert de ligne</h4>}
                icons={tableIcons} // Use the imported tableIcons
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                }}
            />
        </div>
    );
}