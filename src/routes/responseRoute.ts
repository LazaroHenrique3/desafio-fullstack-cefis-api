import { Router } from 'express'

import { ResponseController } from '../controller/response'

const responseRoutes = Router()

responseRoutes.post('/createResponse/:idTeacher', ResponseController.createResponseValidation, ResponseController.createResponse)
responseRoutes.get('/listResponseQuestion/:idQuestion', ResponseController.listResponsesByIdQuestionValidation, ResponseController.ListResponsesByIdQuestion)

export { responseRoutes }