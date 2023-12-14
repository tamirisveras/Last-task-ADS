import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useCookies } from 'react-cookie';


function AddEditFormCurso(prop) {
  const [form, setValues] = useState({
    id: 0,
    curso: '',
  })

  const onChange = value => {
    setValues({
      ...form,
      [value.target.name]: value.target.value
    })
  }

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);


  const submitFormAdd = value => {
    value.preventDefault()
    fetch('http://localhost:8000/cursos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      },
      body: JSON.stringify({
        curso: form.curso,
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          prop.addItemToState(item[0])
          prop.toggle()
        } else {
          console.log('Falha')
          window.location.reload()

        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = value => {
    value.preventDefault()
    fetch(`http://localhost:8000/cursos/${form.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      },
      body: JSON.stringify({
        curso: form.curso,
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          prop.updateState(item[0])
          prop.toggle()
        } else {
          window.location.reload()
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (prop.item) {
      const { id, curso } = prop.item
      setValues({ id, curso })
    }
  }, false)

  return (
    <Form onSubmit={prop.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="first">Nome</Label>
        <Input type="text" name="curso" id="first" onChange={onChange} value={form.curso === null ? '' : form.curso} />
      </FormGroup>
      <Button>Enviar</Button>
    </Form>
  )
}

export default AddEditFormCurso