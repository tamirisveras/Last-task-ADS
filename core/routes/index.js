const bodyParser = require('body-parser')
const cursos = require('./courses')
const alunos = require('./students')
const usuario = require('./user')
const auth = require('./auth')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(cursos)
  app.use(alunos)
  app.use(usuario)
  app.use(auth)

  app.get('/', (request, response) => {
    response.status(200).send({ message: 'Bem-vindo!' })
  })
}
