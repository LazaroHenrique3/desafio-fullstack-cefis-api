import { Router } from 'express'

import { UserController } from '../controller/user'

const userRoutes = Router()

userRoutes.post('/createUser', UserController.createUserValidation,  UserController.createUser)
userRoutes.get('/listUser', UserController.listUserValidation, UserController.listUser)
userRoutes.get('/listUser/:idUser', UserController.getUserByIdValidation, UserController.getUserById)
userRoutes.delete('/deleteUser/:idUser', UserController.deleteUserValidation, UserController.deleteUser)
userRoutes.put('/updateUser/:idUser', UserController.updateUserValidation, UserController.updateUser)

export { userRoutes }