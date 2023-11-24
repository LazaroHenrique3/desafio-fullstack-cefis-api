import { Router } from 'express'

import { UserController } from './controller/user'

const routes = Router()

routes.get('/', (_, res) => res.send('Hello, world!'))

routes.post('/createUser', UserController.createUser)
routes.get('/listUser', UserController.listUser)
routes.get('/listUser/:idUser', UserController.getUserById)
routes.delete('/deleteUser/:idUser', UserController.deleteUser)
routes.put('/updateUser/:idUser', UserController.updateUser)

export { routes }
