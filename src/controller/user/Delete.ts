import { Request, Response } from 'express'

import { DeleteUserService } from '../../services/userServices/DeleteUserService'
import { UserRepository } from '../../repositories/UserRepository'

//Para tipar os params do request
interface IParamProps {
    idUser?: number
}

export const deleteUser = async (request: Request<IParamProps>, response: Response) => {
    const { idUser } = request.params

    const deleteUser = new DeleteUserService(new UserRepository())
    const resultDeleteUser = await deleteUser.execute(Number(idUser))

    if(resultDeleteUser instanceof Error){
        return response.status(500).json({
            errors: { default: resultDeleteUser.message }
        })
    } else if (resultDeleteUser === null) {
        return response.status(404).json({
            errors: { default: 'Registro não encontado para exclusão.' }
        })
    }


    return response.status(204).send()
}