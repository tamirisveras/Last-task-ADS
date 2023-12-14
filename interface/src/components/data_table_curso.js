import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './moda_curso'
import { useCookies } from 'react-cookie';

function DataTable(props){
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const deleteItem = id => {
    let confirmDelete = window.confirm('Excluir Permanentemente ?')
    if(confirmDelete){
      fetch(`http://localhost:8000/cursos/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      }
    })
      .then(response => response.json())
      .then(item => {
        props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.curso}</td>
        <td>
          <div style={{width:"110px"}}>
            <ModalForm buttonLabel="Editar" item={item} updateState={props.updateState}/>
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.id)}>Excluir</Button>
          </div>
        </td>
      </tr>
      )
    })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable