import { Router } from 'express'

import { UserController } from '../controller/user'
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated'

const userRoutes = Router()

//Rota pública
userRoutes.post('/signInUser', UserController.signInUserValidation,  UserController.signInUser)
//Rotas privadas
userRoutes.post('/createUser', ensureAuthenticated, UserController.createUserValidation,  UserController.createUser)
userRoutes.get('/listUser', ensureAuthenticated, UserController.listUserValidation, UserController.listUser)
userRoutes.get('/listUser/:idUser', ensureAuthenticated, UserController.getUserByIdValidation, UserController.getUserById)
userRoutes.delete('/deleteUser/:idUser', ensureAuthenticated, UserController.deleteUserValidation, UserController.deleteUser)
userRoutes.put('/updateUser/:idUser', ensureAuthenticated, UserController.updateUserValidation, UserController.updateUser)

export { userRoutes }