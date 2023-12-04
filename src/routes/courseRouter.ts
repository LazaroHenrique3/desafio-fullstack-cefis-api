import { Router } from 'express'

import { CourseController } from '../controller/course'
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated'

const courseRoutes = Router()

//Rotas privadas
courseRoutes.post('/createCourse', ensureAuthenticated, CourseController.createCourseValidation, CourseController.createCourse)
courseRoutes.get('/listCourse', ensureAuthenticated, CourseController.listCourseValidation, CourseController.listCourse)
courseRoutes.get('/listCourse/:idCourse', ensureAuthenticated, CourseController.getCourseByIdValidation, CourseController.getCourseById)
courseRoutes.delete('/deleteCourse/:idCourse', ensureAuthenticated, CourseController.deleteCourseValidation, CourseController.deleteCourse)
courseRoutes.put('/updateCourse/:idCourse', ensureAuthenticated, CourseController.updateCourseValidation, CourseController.updateCourse)

export { courseRoutes }