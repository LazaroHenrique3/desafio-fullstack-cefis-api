import { Router } from 'express'

import { ResponseController } from '../controller/response'
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated'

const responseRoutes = Router()

//Rotas privadas
responseRoutes.post('/createResponse/:idTeacher', ensureAuthenticated, ResponseController.createResponseValidation, ResponseController.createResponse)
responseRoutes.get('/listResponseQuestion/:idQuestion', ensureAuthenticated, ResponseController.listResponsesByIdQuestionValidation, ResponseController.ListResponsesByIdQuestion)
responseRoutes.delete('/deleteResponse/:idResponse', ensureAuthenticated, ResponseController.deleteResponseValidation, ResponseController.deleteResponse)

export { responseRoutes }