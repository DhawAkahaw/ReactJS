import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Loading from '../Loading';

export default function Dashboard() {
  const [mail, setMail] = useState(null);
  const [offre, setOffre] = useState(null);
  const [factures, setFactures] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    tel: '',
    rue: '',
    gouvernorat: '',
    delegation: '',
    localite: '',
    ville: '',
    code_postal: '',
    gsm: '',
    login: '',
    password: '',
    code_Client: '',
    type_Client: '',
    id: '',
    reste_a_payer: '',
    designation: '',
    reference_contrat: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    axios.get('api/currentuser')
      .then(res => {
        if (res.data.status === 200) {
          const currentUser = res.data.currentuser;
          setFormData({
            name: currentUser.name,
            lastName: currentUser.last_name,
            tel: currentUser.tel,
            gsm: currentUser.gsm,
            login: currentUser.login,
            code_Client: currentUser.code_Client,
            id: currentUser._id
          });
          setLoading(false);
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

  useEffect(() => {
    axios.get('api/currentuser')
      .then(response => {
        const userId = response.data.currentuser._id;
        axios.get(`api/contract/${userId}`)
          .then(response => {
            setOffre(response.data.contract);
          })
          .catch(error => {
            console.error('Error fetching Contract:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('api/currentuser')
      .then(response => {
        const userId = response.data.currentuser._id;
        axios.get(`api/factures/${userId}`)
          .then(response => {
            const factures = response.data.facture;
            const facturesWithZeroreste = factures.filter(facture => facture.reste_a_payer !== '0');
            setFactures(facturesWithZeroreste.length);
          })
          .catch(error => {
            console.error('Error fetching mail:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col md={6} lg={4} className="mb-4">
          <Card className="text-left">
            <Card.Body>
              <Card.Title>Mes informations</Card.Title>
              <Card.Text><strong>{formData.name} {formData.lastName}</strong></Card.Text>
              <Card.Text>Code client : {formData.code_Client}</Card.Text>
              <Card.Text>{formData.login}</Card.Text>
              <Link to="/espaceclient/profile">
                <Button variant="primary">MODIFIER MES INFORMATIONS</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="text-left">
            <Card.Body>
              <Card.Title>Mon Offre</Card.Title>
              {offre && offre.length > 1 ? (
                <div>
                  <Card.Text><strong>Designation:</strong> {offre[1].designation}</Card.Text>
                  <Card.Text><strong>Ref:</strong> {offre[1].reference_contrat}</Card.Text>
                </div>
              ) : (
                <Card.Text>No second offre found</Card.Text>
              )}
              <Link to="/espaceclient/contrats">
                <Button variant="primary">VOIR TOUT LES OFFRE</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="text-left">
            <Card.Body>
              <Card.Title>Assistance</Card.Title>
              <div>
                <Link to="/espaceclient/nouvelle_reclamation">
                  <Button variant="link"><i className="fas fa-fw fa-hands-helping"></i> Nouvelle demande d’assistance</Button>
                </Link>
                <Link to="/espaceclient/nouvelle_demande">
                  <Button variant="link"><i className="fas fa-fw fa-hands-helping"></i> Nouvelle réclamation</Button>
                </Link>
                <Link to="/espaceclient/nouvelle_demande">
                  <Button variant="link"><i className="fas fa-fw fa-exchange-alt"></i> Nouvelle demande de Transfert</Button>
                </Link>
                <Link to="/espaceclient/nouvelle_demande">
                  <Button variant="link"><i className="fa fa-comment"></i> Nouvelle suggestion</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6} lg={4} className="mb-4">
          <Card className="text-left">
            <Card.Body>
              <Card.Title>Mes factures</Card.Title>
              <Card.Text>Factures non payées: {factures}</Card.Text>
              <Link to="/espaceclient/factures">
                <Button variant="primary">CONSULTER MES FACTURES</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="text-left">
            <Card.Body>
              <Card.Title>Mes Email</Card.Title>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {mail && mail.length > 0 ? (
                    mail.map((email, index) => (
                      <tr key={index}>
                        <td>{email.mail}</td>
                        <td>{email.State}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No emails found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Link to="/espaceclient/gestion_mails">
                <Button variant="primary">CONSULTER MES EMAIL</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}