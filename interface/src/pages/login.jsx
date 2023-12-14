import React, { useState } from 'react';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { login } from '../services/auth_service';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Template from './template';

const Login = () => {
  const [cookies, setCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });

  const [loginError, setLoginError] = useState(null);

  const handleChange = (value) => {
    setLoginData({
      ...loginData,
      [value.target.name]: value.target.value,
    });
  };

  const handleLogin = async (value) => {
    value.preventDefault();

    try {
      const data = await login(loginData);

      setCookie('jwt', data.accessToken, { path: '/' });
      navigate('/alunos');

    } catch (error) {
      console.error('Login falhou:', error);
      setLoginError('Erro ao fazer login, verifique suas credenciais.');
    }
  };

  return (
    <Template>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Card>
              <CardBody>
                <h2 className="text-center">Login</h2>
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <Label for="username">Email</Label>
                    <Input type="text" name="email" id="email" onChange={handleChange} value={loginData.email} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input type="password" name="senha" id="password" onChange={handleChange} value={loginData.senha} />
                  </FormGroup>
                  <Button color="success" block type="submit">
                    Entrar
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

export default Login;
