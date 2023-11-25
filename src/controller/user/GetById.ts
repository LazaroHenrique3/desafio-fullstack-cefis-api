import { Request, Response } from 'express'
import * as yup from 'yup'

import { GetUserByIdService } from '../../services/userServices/GetUserById'
import { UserRepository } from '../../repositories/UserRepository'
import { validation } from '../../middlewares/Validation'

//Para tipar os params do request
interface IParamProps {
    idUser?: number
}

export const getUserByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idUser: yup.number().integer().required().moreThan(0),
    })),
}))

export const getUserById = async (request: Request<IParamProps>, response: Response) => {
    const { idUser } = request.params

    const getUserById = new GetUserByIdService(new UserRepository())
    const resultGetUserById = await getUserById.execute(Number(idUser))

    if (resultGetUserById instanceof Error) {
        return response.status(500).json({
            errors: { default: resultGetUserById.message }
        })
    } else if (resultGetUserById === null || resultGetUserById === undefined) {
        return response.status(404).json({
            errors: { default: 'Registro não encontado.' }
        })
    }

    return response.status(200).json(resultGetUserById)
}