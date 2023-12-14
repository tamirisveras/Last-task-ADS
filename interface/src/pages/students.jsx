import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Alert, Card, CardBody, Badge } from 'reactstrap';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import Template from './template';
import ModalForm from '../components/modal';
import DataTable from '../components/data_table';
import { useCookies } from 'react-cookie';

function Alunos() {
  const [items, setItems] = useState([]);
  const [cookies] = useCookies(['jwt']);

  const getItems = () => {
    fetch('http://localhost:8000/alunos', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.jwt}`,
      },
    })
      .then((response) => response.json())
      .then((items) => setItems(items))
      .catch((err) => console.log(err));
  };

  const addItemToState = (item) => {
    setItems([...items, item]);
  };

  const updateState = (item) => {
    const itemIndex = items.findIndex((data) => data.id === item.id);
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)];
    setItems(newArray);
  };

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (!cookies.jwt) {
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  }, [cookies.jwt]);

  if (!cookies.jwt) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Alert color="danger">
              <h4 className="alert-heading">Acesso Negado!</h4>
              <p>E necessario esta logado para acessar esta página!</p>
              <hr />
              <p className="mb-0">Você será redirecionado para a página de login!</p>
            </Alert>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Template pageTitle="Alunos">
        <Row className="mb-4">
          <Col>
            <Card>
              <CardBody>
                <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CSVLink
                  filename={'db.csv'}
                  style={{ float: 'left', marginRight: '10px' }}
                  className="btn btn-success"
                  data={items}
                >Baixar
                </CSVLink>
                <ModalForm buttonLabel="Adicionar Aluno" addItemToState={addItemToState} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Template>
    );
  }
}

export default Alunos;
