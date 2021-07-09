import express from 'express'
import morgan from 'morgan'
import { createRole } from './libs/initialSetup.js'
// Midelewares
import { veriftToken } from './midelewares/index.js'
// Importando las rutas
import weigthRoutes from './routes/weight.routes.js'
import auth from './routes/auth.routes.js'

const app = express()
createRole()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    author: 'IRVB',
    description: '',
    version: '0.0.0'
  })
})

app.use('/weights', veriftToken, weigthRoutes)
app.use('/auth', auth)

export default app
