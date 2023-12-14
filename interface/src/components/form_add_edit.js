import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useCookies } from 'react-cookie';


function AddEditForm(prop) {
  const [form, setValues] = useState({
    id: 0,
    nome: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    cur_id: '',
  });

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);


  const [emailInputColor, setEmailInputColor] = useState('');

  const onChange = (value) => {
    setValues({
      ...form,
      [value.target.name]: value.target.value,
    });
  };

  const submitFormAdd = async (value) => {
    value.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/alunos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.jwt}`
        },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          createdAt: form.createdAt,
          updatedAt: form.updatedAt,
          cur_id: form.cur_id,
        }),
      });

      const item = await response.json();

      if (item && item.Message && item.Message === 'E-mail já existe!') {
        alert('E-mail já existe. Use um Email Diferente.');

        setEmailInputColor('red');
      } else if (Array.isArray(item)) {
        prop.addItemToState(item[0]);
        prop.toggle();
      } else {
        console.log('Falha');
        window.location.reload();

      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitFormEdit = async (value) => {
    value.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/alunos/${form.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.jwt}`
        },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          cur_id: form.cur_id,
        }),
      });

      const item = await response.json();

      if (item && item.Message && item.Message === 'E-mail já existe!') {
        alert('E-mail já existe. Use um Email Diferente.');

        setEmailInputColor('red');
      } else if (Array.isArray(item)) {
        prop.updateState(item[0]);
        prop.toggle();
      } else {
        console.log('Falha');
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (prop.item) {
      const { id, nome, email, createdAt, updatedAt, cur_id } = prop.item;
      setValues({ id, nome, email, createdAt, updatedAt, cur_id });
    }
  }, [prop.item]);

  const [cursos, setCursos] = useState([]);

  const getCursos = () => {
    fetch('http://localhost:8000/cursos',
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.jwt}`
        }
      },)
      .then((response) => response.json())
      .then((items) => setCursos(items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCursos();
  }, []);

  return (
    <Form onSubmit={prop.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="first">Nome</Label>
        <Input type="text" name="nome" id="first" onChange={onChange} value={form.nome === null ? '' : form.nome} />
      </FormGroup>
      <FormGroup>
        <Label for="last">Email</Label>
        <Input
          type="text"
          name="email"
          id="last"
          onChange={onChange}
          value={form.email === null ? '' : form.email}
          style={{ borderColor: emailInputColor }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="cursoSelect">Selecione um Curso</Label>
        <Input type="select" name="cur_id" id="cursoSelect" onChange={onChange} value={form.cur_id === null ? '' : form.cur_id}>
          <option value="">Selecionar um Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.curso}
            </option>
          ))}
        </Input>
      </FormGroup>
      <Button>Enviar</Button>
    </Form>
  );
}

export default AddEditForm;
