import 'dotenv/config'
import Express from 'express'
import cors from 'cors'

import { routes } from './routes'

const app = Express()

app.use(cors())
app.use(Express.json())
app.use(routes)

const PORT = process.env.PORT ? process.env.PORT : 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})