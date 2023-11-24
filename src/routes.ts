import { Router } from 'express'

import { UserController } from './controller/user'
import { CourseController } from './controller/course'

const routes = Router()

routes.get('/', (_, res) => res.send('Hello, world!'))

//User
routes.post('/createUser', UserController.createUser)
routes.get('/listUser', UserController.listUser)
routes.get('/listUser/:idUser', UserController.getUserById)
routes.delete('/deleteUser/:idUser', UserController.deleteUser)
routes.put('/updateUser/:idUser', UserController.updateUser)

//User
routes.post('/createCourse', CourseController.createCourse)
routes.get('/listCourse', CourseController.listCourse)
routes.get('/listCourse/:idCourse', CourseController.getCourseById)
routes.delete('/deleteCourse/:idCourse', CourseController.deleteCourse)
routes.put('/updateCourse/:idCourse', CourseController.updateCourse)

export { routes }
