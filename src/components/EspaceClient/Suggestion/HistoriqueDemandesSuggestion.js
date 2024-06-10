import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons'; // Import tableIcons from its file

export default function Suggestions() {
    const [suggestion, setSuggestion] = useState([]);

    useEffect(() => {
        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/SuggestionsHistory/${userId}`)
                    .then(response => {
                        setSuggestion(response.data.suggestion);
                    })
                    .catch(error => {
                        console.error('Error fetching suggestions:', error);
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
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Sujet</h6>,
                        render: rowData => <p>{rowData.Subject}</p>
                    },
                    {
                        title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Date de création	</h6>,
                        render: rowData => <p>{formatDate(rowData.created_at)}</p>
                    },
                    
                   
                ]}
                data={suggestion}
                title={<h4>Historique des suggestions</h4>}
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
