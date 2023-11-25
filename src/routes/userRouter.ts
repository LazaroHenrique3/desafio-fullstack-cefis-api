import { Router } from 'express'

import { UserController } from '../controller/user'

const userRoutes = Router()

userRoutes.post('/createUser', UserController.createUser)
userRoutes.get('/listUser', UserController.listUser)
userRoutes.get('/listUser/:idUser', UserController.getUserById)
userRoutes.delete('/deleteUser/:idUser', UserController.deleteUser)
userRoutes.put('/updateUser/:idUser', UserController.updateUser)

export { userRoutes }