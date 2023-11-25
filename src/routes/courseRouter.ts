import { Router } from 'express'

import { CourseController } from '../controller/course'

const courseRoutes = Router()

courseRoutes.post('/createCourse', CourseController.createCourse)
courseRoutes.get('/listCourse', CourseController.listCourse)
courseRoutes.get('/listCourse/:idCourse', CourseController.getCourseById)
courseRoutes.delete('/deleteCourse/:idCourse', CourseController.deleteCourse)
courseRoutes.put('/updateCourse/:idCourse', CourseController.updateCourse)

export { courseRoutes }