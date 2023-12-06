import { Request, Response } from 'express'
import * as yup from 'yup'
import { User } from '@prisma/client'

import { UpdateUserService } from '../../services/userServices/UpdateUserService'
import { UserRepository } from '../../repositories/UserRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Para tipar o body do request
interface IBodyProps extends Omit<User, 'id' | 'role'> { }

//Para tipar os params do request
interface IParamProps {
    idUser?: number
}

//Middleware
export const updateUserValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idUser: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required().email().min(5).max(100),
        password: yup.string().optional().min(6),
    }))
}))

export const updateUser = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    const { name, email, password } = request.body
    const { idUser } = request.params

    //Como esta rota é privada se chegou até aqui significa que passou pela autenticação e foi inserido o id do user extraído do token para dentro dos headers
    const idUserToken: number = (request.headers.idUser) ? Number(request.headers.idUser) : 0

    const updateUser = new UpdateUserService(new UserRepository())
    const resultUpdateUser = await updateUser.execute(Number(idUser), String(name), String(email), password || '', idUserToken)

    if(resultUpdateUser instanceof CustomError){
        return response.status(resultUpdateUser.status).json({
            errors: { default: resultUpdateUser.message }
        })
    } 

    return response.status(200).json(resultUpdateUser)
}