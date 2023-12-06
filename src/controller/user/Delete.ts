import { Request, Response } from 'express'
import * as yup from 'yup'

import { DeleteUserService } from '../../services/userServices/DeleteUserService'
import { UserRepository } from '../../repositories/UserRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Para tipar os params do request
interface IParamProps {
    idUser?: number
}

export const deleteUserValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idUser: yup.number().integer().required().moreThan(0),
    })),
}))

export const deleteUser = async (request: Request<IParamProps>, response: Response) => {
    const { idUser } = request.params

    //Como esta rota é privada se chegou até aqui significa que passou pela autenticação e foi inserido o id do user extraído do token para dentro dos headers
    const idUserToken: number = (request.headers.idUser) ? Number(request.headers.idUser) : 0

    const deleteUser = new DeleteUserService(new UserRepository())
    const resultDeleteUser = await deleteUser.execute(Number(idUser), idUserToken)

    if (resultDeleteUser instanceof CustomError) {
        return response.status(resultDeleteUser.status).json({
            errors: { default: resultDeleteUser.message }
        })
    }

    return response.status(204).send()
}