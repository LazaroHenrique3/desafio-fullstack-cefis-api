import { Request, Response } from 'express'
import { User } from '@prisma/client'

import { UpdateUserService } from '../../services/userServices/UpdateUserService'
import { UserRepository } from '../../repositories/UserRepository'

//Para tipar o body do request
interface IBodyProps extends Omit<User, 'id'> { }

//Para tipar os params do request
interface IParamProps {
    idUser: number
}

export const updateUser = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    const { name } = request.body
    const { idUser } = request.params

    const updateUser = new UpdateUserService(new UserRepository())
    const resultUpdateUser = await updateUser.execute(Number(idUser), name)

    if(resultUpdateUser instanceof Error){
        return response.status(500).json({
            errors: { default: resultUpdateUser.message }
        })
    } else if (resultUpdateUser === null) {
        return response.status(404).json({
            errors: { default: 'Registro não encontado para atualização.' }
        })
    }

    return response.status(200).json(resultUpdateUser)
}