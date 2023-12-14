import React from 'react';
import { Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { useCookies } from 'react-cookie';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Template = ({ pageTitle, children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const handleLogout = () => {
    removeCookie('jwt', { path: '/' });
  };

  return (
    <Container fluid className="App">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/alunos" style={{ fontWeight: 'bold', color: '#333' }}>Escola</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/cursos">Cursos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/alunos">Alunos</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/register">Cadastro</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleLogout} style={{ cursor: 'pointer' }}>Sair</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
      <Row>
        <Col>
          <Card>
            <Col>
              <h1 style={{ margin: '20px 0', textAlign: 'center' }}>{pageTitle}</h1>
              <CardBody>
                <Col>{children}</Col>
              </CardBody>
            </Col>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Template;
