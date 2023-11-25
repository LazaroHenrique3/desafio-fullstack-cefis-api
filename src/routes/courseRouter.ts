import { Router } from 'express'

import { CourseController } from '../controller/course'

const courseRoutes = Router()

courseRoutes.post('/createCourse', CourseController.createCourseValidation, CourseController.createCourse)
courseRoutes.get('/listCourse', CourseController.listCourseValidation, CourseController.listCourse)
courseRoutes.get('/listCourse/:idCourse', CourseController.getCourseByIdValidation, CourseController.getCourseById)
courseRoutes.delete('/deleteCourse/:idCourse', CourseController.deleteCourseValidation, CourseController.deleteCourse)
courseRoutes.put('/updateCourse/:idCourse', CourseController.updateCourseValidation, CourseController.updateCourse)

export { courseRoutes }