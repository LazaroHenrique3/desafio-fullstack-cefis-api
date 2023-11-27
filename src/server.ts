import 'dotenv/config'
import Express from 'express'
import cors from 'cors'

//Traduções das validações do Yup
import './externalServices/TranslationsYup'

import { routes } from './routes/routes'

//swagger
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '.././swagger.json'

const app = Express()

app.use(cors())
app.use(Express.json())
app.use(routes)

//Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const PORT = process.env.PORT ? process.env.PORT : 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})