import React, { useState } from 'react';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { registrar } from '../services/auth_service';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Template from './template';

const Register = () => {
  const [cookies] = useCookies(['jwt']);
  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const navigate = useNavigate();

  const [registrationError, setRegistrationError] = useState(null);

  const handleChange = (value) => {
    setRegisterData({
      ...registerData,
      [value.target.name]: value.target.value,
    });
  };

  const validateForm = () => {
    const { nome, email, senha } = registerData;

    if (!nome || !email || !senha) {
      setRegistrationError('Todos os Campos são Obrigatórios!');
      return false;
    }

    if (!isValidEmail(email)) {
      setRegistrationError('Email Inválido!');
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (value) => {
    value.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = await registrar(registerData);

      console.log('Cadastro Realizado com Sucesso:', data);
      navigate('/');
    } catch (error) {
      console.error('Falha no Cadastro:', error);
      setRegistrationError('Erro ao Realizar o Cadastro, Verifique suas Credenciais.');
    }
  };

  return (
    <Template>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Card>
              <CardBody>
                <h2 className="text-center">Cadastro</h2>
                {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
                <Form onSubmit={handleRegister}>
                  <FormGroup>
                    <Label for="name">Nome</Label>
                    <Input type="text" name="nome" id="name" onChange={handleChange} value={registerData.nome} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" onChange={handleChange} value={registerData.email} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input type="password" name="senha" id="password" onChange={handleChange} value={registerData.senha} />
                  </FormGroup>
                  <Button color="success" block type="submit">
                    Cadastro
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Template>
  );
};

export default Register;
