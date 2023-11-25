import { Router } from 'express'

import { QuestionController } from '../controller/question'

const questionRoutes = Router()

questionRoutes.post('/createQuestion', QuestionController.createQuestionValidation, QuestionController.createQuestion)
questionRoutes.get('/listQuestionCourse/:idCourse', QuestionController.listQuestionsByIdCourseValidation, QuestionController.ListQuestionsByIdCourse)

export { questionRoutes }