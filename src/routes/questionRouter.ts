import { Router } from 'express'

import { QuestionController } from '../controller/question'
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated'

const questionRoutes = Router()

//Rotas privadas
questionRoutes.post('/createQuestion', ensureAuthenticated, QuestionController.createQuestionValidation, QuestionController.createQuestion)
questionRoutes.get('/listQuestionCourse/:idCourse', ensureAuthenticated, QuestionController.listQuestionsByIdCourseValidation, QuestionController.ListQuestionsByIdCourse)
questionRoutes.delete('/deleteQuestion/:idQuestion', ensureAuthenticated, QuestionController.deleteQuestionValidation, QuestionController.deleteQuestion)

export { questionRoutes }