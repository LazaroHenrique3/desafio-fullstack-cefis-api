import { Request, Response } from 'express'
import * as yup from 'yup'
import { User } from '@prisma/client'

import { UpdateUserService } from '../../services/userServices/UpdateUserService'
import { UserRepository } from '../../repositories/UserRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Para tipar o body do request
interface IBodyProps extends Omit<User, 'id'> { }

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
        role: yup.string().oneOf(['STUDENT', 'TEACHER']).required()
    }))
}))

export const updateUser = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    const { name } = request.body
    const { idUser } = request.params

    const updateUser = new UpdateUserService(new UserRepository())
    const resultUpdateUser = await updateUser.execute(Number(idUser), String(name))

    if(resultUpdateUser instanceof CustomError){
        return response.status(resultUpdateUser.status).json({
            errors: { default: resultUpdateUser.message }
        })
    } 

    return response.status(200).json(resultUpdateUser)
}