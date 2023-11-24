import { Request, Response } from 'express'
import { User } from '@prisma/client'

import { CreateUserService } from '../../services/userServices/CreateUserService'
import { UserRepository } from '../../repositories/UserRepository'

//Para tipar o body do request
interface IBodyProps extends Omit<User, 'id'> { }

export const createUser = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { name, role } = request.body

    const createUser = new CreateUserService(new UserRepository())
    const resultUser = await createUser.execute(name, role as 'STUDENT' | 'TEACHER')

    if (resultUser instanceof Error) {
        return response.status(500).json({
            errors: { default: resultUser.message }
        })
    }

    return response.status(201).json(resultUser)
}