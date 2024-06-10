import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons'; // Import tableIcons from its file

export default function Demands() {
    const [demand, setDemand] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUserResponse = await axios.get('api/currentuser');
                const userId = currentUserResponse.data.currentuser._id;
                const demandsResponse = await axios.get(`api/Demands/${userId}`);
                setDemand(demandsResponse.data.demand);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    // Function to format date string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
        return formattedDate;
    };

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={[
                    {
                        title: 'Ticket',
                        field: 'Ticket',
                        render: rowData => <div style={{ fontSize: '14px' }}>{rowData.Ticket}</div>,
                        customFilterAndSearch: (term, rowData) => ((rowData.Ticket || '').toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: 'Service',
                        field: 'Service',
                        render: rowData => <div style={{ fontSize: '14px' }}>{rowData.Service}</div>
                    },
                    {
                        title: 'Motif',
                        field: 'Motif_demand',
                        render: rowData => <div style={{ fontSize: '14px' }}>{rowData.Motif_demand}</div>
                    },
                    {
                        title: 'Date de création',
                        field: 'created_at',
                        render: rowData => <div style={{ fontSize: '14px' }}>{formatDate(rowData.created_at)}</div>
                    },
                    {
                        title: 'Etat',
                        field: 'State',
                        render: rowData => (
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'green', marginRight: 8 }}></div>
                                <span style={{ color: 'green', textShadow: '0px 0px 10px green' }}>{rowData.State}</span>
                            </div>
                        )
                    },
                ]}
                data={demand}
                title="Historique des demandes"
                icons={tableIcons} // Use the imported tableIcons
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                    headerStyle: {
                        backgroundColor: '#f48404',
                        color: '#fff',
                        fontSize: '16px'
                    }
                }}
            />
        </div>
    );
}
