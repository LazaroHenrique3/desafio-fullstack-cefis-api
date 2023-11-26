import { Request, Response } from 'express'
import * as yup from 'yup'
import { User } from '@prisma/client'

import { CreateUserService } from '../../services/userServices/CreateUserService'
import { UserRepository } from '../../repositories/UserRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Para tipar o body do request
interface IBodyProps extends Omit<User, 'id'> { }

//Midleware
export const createUserValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        role: yup.string().oneOf(['STUDENT', 'TEACHER']).required()
    }))
}))

export const createUser = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { name, role } = request.body

    const createUser = new CreateUserService(new UserRepository())
    const resultUser = await createUser.execute(String(name), String(role) as 'STUDENT' | 'TEACHER')

    if (resultUser instanceof CustomError) {
        return response.status(resultUser.status).json({
            errors: { default: resultUser.message }
        })
    }

    return response.status(201).json(resultUser)
}