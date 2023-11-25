import { Router } from 'express'

import { userRoutes } from './userRouter'
import { courseRoutes } from './courseRouter'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/courses', courseRoutes)

export { routes }
