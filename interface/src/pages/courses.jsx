import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, CardBody, Badge } from 'reactstrap';
import { CSVLink } from 'react-csv';
import ModalForm from '../components/moda_curso';
import DataTable from '../components/data_table_curso';
import Template from './template';
import { useCookies } from 'react-cookie';

function Cursos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['jwt']);

  const getItems = () => {
    fetch('http://localhost:8000/cursos', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.jwt}`,
      },
    })
      .then(response => response.json())
      .then(items => {
        setItems(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar cursos:', err);
        setLoading(false);
      });
  };

  const addItemToState = item => {
    setItems(prevItems => [...prevItems, item]);
  };

  const updateState = item => {
    const updatedItems = items.map(data => (data.id === item.id ? item : data));
    setItems(updatedItems);
  };

  const deleteItemFromState = id => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Template pageTitle="Cursos">
      {loading ? (
        <p>Carregando Cursos...</p>
      ) : (
        <>
          <Row className="mt-4">
            <Col md={{ size: 6, offset: 3 }}>
              <Card body className="border rounded mx-auto">
                <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={{ size: 6, offset: 3 }}>
              <Card body className="border rounded mx-auto">
                <CardBody className="d-flex justify-content-between align-items-center">
                  <div>
                    <CSVLink filename={'db.csv'} className="btn btn-success mr-2" data={items}>
                      Baixar
                    </CSVLink>
                  </div>
                  <div>
                    <ModalForm buttonLabel="Adicionar Curso" addItemToState={addItemToState} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Template>
  );
}

export default Cursos;
