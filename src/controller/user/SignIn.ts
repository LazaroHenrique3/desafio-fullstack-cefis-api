import { Request, Response } from 'express'
import * as yup from 'yup'
import { User } from '@prisma/client'

import { SignInUserService } from '../../services/userServices/SignInUserService'
import { UserRepository } from '../../repositories/UserRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Para tipar o body do request
interface IBodyProps extends Omit<User, 'id' | 'name' | 'role'> { }

//Midleware
export const signInUserValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5).max(100),
        password: yup.string().required().min(6),
    }))
}))

export const signInUser = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { email, password } = request.body

    const signInUser = new SignInUserService(new UserRepository())
    const resultUser = await signInUser.execute(String(email), String(password))

    if (resultUser instanceof CustomError) {
        return response.status(resultUser.status).json({
            errors: { default: resultUser.message }
        })
    }

    return response.status(201).json(resultUser)
}