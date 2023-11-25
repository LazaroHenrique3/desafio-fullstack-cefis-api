import { Router } from 'express'

import { userRoutes } from './userRouter'
import { courseRoutes } from './courseRouter'
import { questionRoutes } from './questionRouter'
import { responseRoutes } from './responseRoute'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/courses', courseRoutes)
routes.use('/questions', questionRoutes)
routes.use('/responses', responseRoutes)

export { routes }
