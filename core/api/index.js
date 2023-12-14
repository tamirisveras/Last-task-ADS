const express = require('express')
const routes = require('../routes')
const cors = require('cors')
const app = express()
const port = 8000

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app)
app.listen(port, () => console.log('Servidor Pronto!'))

module.exports = app
