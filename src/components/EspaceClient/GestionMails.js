import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from '../MaterialTableIcons'; // Import tableIcons from its file
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@material-ui/core';
import swal from 'sweetalert';

export default function Mail() {
    const [mail, setMail] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newMail, setNewMail] = useState({
        mail: '',
        mail_rec: '',
        new_num_tel: '',
        State: '',
        domaine: '',
        client_id: '',
        Option: 'Topnet.tn',
        pass: '',
        pass1: ''
    });

    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        axios.get('api/currentuser')
            .then(res => {
                if (res.data.status === 200) {
                    setNewMail(prevState => ({
                        ...prevState,
                        name: res.data.currentuser.name,
                        lastName: res.data.currentuser.last_name,
                        rue: res.data.currentuser.rue,
                        gouvernorat: res.data.currentuser.gouvernorat,
                        delegation: res.data.currentuser.delegation,
                        localite: res.data.currentuser.localite,
                        ville: res.data.currentuser.ville,
                        code_postal: res.data.currentuser.code_postal,
                        tel: res.data.currentuser.tel,
                        gsm: res.data.currentuser.gsm,
                        login: res.data.currentuser.login,
                        password: res.data.currentuser.password,
                        picture: res.data.currentuser.picture,
                        code_Client: res.data.currentuser.code_Client,
                        type_Client: res.data.currentuser.type_Client,
                        id: res.data.currentuser._id
                    }));
                    setToken(token);
                } else if (res.data.status === 404) {
                    swal("", res.data.message, "error");
                }
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('api/currentuser')
            .then(response => {
                const userId = response.data.currentuser._id;
                axios.get(`api/maillist/${userId}`)
                    .then(response => {
                        setMail(response.data.mail);
                    })
                    .catch(error => {
                        console.error('Error fetching mail:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddMail = async () => {
        try {
            const concatenatedMail = `${newMail.mail}@${newMail.domaine}`;
            if (newMail.pass !== newMail.pass1) {
                swal("", "Passwords do not match", "error");
                return;
            }
            const newData = {
                ...newMail,
                mail: concatenatedMail
            };

            const response = await axios.post(`api/addmail/${newData.id}`, newData);

            if (response.status === 201) {
                swal("", response.data.message, "success");
                setNewMail({
                    mail: '',
                    mail_rec: '',
                    new_num_tel: '',
                    State: '',
                    domaine: '',
                    pass: '',
                    pass1: ''
                });

                const userId = response.data.currentuser._id;
                axios.get(`api/maillist/${userId}`)
                    .then(response => {
                        setMail(response.data.mail);
                    })
                    .catch(error => {
                        console.error('Error fetching mail:', error);
                    });
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setOpenDialog(false);
    };

    return (
        <div style={{ maxWidth: '100%' }}>
            <div className="card">
                <div className="card-header text-center">
                    <h4>Liste des adresses email</h4>
                </div>
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                        columns={[
                            {
                                title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Adresse</h6>,
                                render: rowData => <p>{rowData.mail}</p>,
                                customFilterAndSearch: (term, rowData) => ((rowData.mail).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                            },
                            {
                                title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Email de récupération</h6>,
                                render: rowData => <p>{rowData.mail_rec}</p>
                            },
                            {
                                title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Quota utilisé</h6>,
                                render: rowData => (
                                    <div style={{ width: '100%' }}>
                                        <LinearProgress variant="determinate" value={rowData.Quota} />
                                        <span>{`${rowData.Quota}%`}</span>
                                    </div>
                                )
                            },
                            {
                                title: <h6 style={{ fontSize: '17px', color: '#f48404' }}>Statut</h6>,
                                render: rowData => (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'green', marginRight: 8 }}></div>
                                        <span style={{ color: 'green', textShadow: '0px 0px 10px green' }}>{rowData.State}</span>
                                    </div>
                                )
                            },
                        ]}
                        data={mail}
                        title=""
                        icons={tableIcons} // Use the imported tableIcons
                        options={{
                            padding: 'dense',
                            pageSize: 4,
                            pageSizeOptions: [2, 3, 4],
                        }}
                    />
                </div>
                <div className="card-footer text-center">
                    <div className="card-footer">
                        <div className="row justify-content-end">
                            <div className="col-sm-2 text-right">
                                <button type="submit" className="btn btn-primary btn-sm" onClick={handleOpenDialog}>Ajouter un email</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Ajouter un email</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mail"
                        name="mail"
                        label="Adresse email *"
                        type="email"
                        fullWidth
                        value={newMail.mail}
                        onChange={(e) => setNewMail({ ...newMail, mail: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="domaine-label">Domaine</InputLabel>
                        <Select
                            labelId="domaine-label"
                            id="domaine"
                            value={newMail.domaine}
                            onChange={(e) => setNewMail({ ...newMail, domaine: e.target.value })}
                        >
                            <MenuItem value={newMail.Option}>{newMail.Option}</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="mail_rec"
                        name="mail_rec"
                        label="Email de récupération"
                        type="email"
                        fullWidth
                        value={newMail.mail_rec}
                        onChange={(e) => setNewMail({ ...newMail, mail_rec: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Annuler</Button>
                    <Button onClick={handleAddMail} color="primary">Ajouter</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
