import { Request, Response } from 'express'
import * as yup from 'yup'

import { DeleteResponseService } from '../../services/responseServices/DeleteResponseService'
import { ResponseRepository } from '../../repositories/ResponseRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Para tipar os params do request
interface IParamProps {
    idResponse?: number
}

export const deleteResponseValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idResponse: yup.number().integer().required().moreThan(0),
    })),
}))

export const deleteResponse = async (request: Request<IParamProps>, response: Response) => {
    const { idResponse } = request.params

    //Como esta rota é privada se chegou até aqui significa que passou pela autenticação e foi inserido o id do user extraído do token para dentro dos headers
    const idUserToken: number = (request.headers.idUser) ? Number(request.headers.idUser) : 0

    const deleteResponse = new DeleteResponseService(new ResponseRepository())
    const resultDeleteResponse = await deleteResponse.execute(Number(idResponse), idUserToken)

    if (resultDeleteResponse instanceof CustomError) {
        return response.status(resultDeleteResponse.status).json({
            errors: { default: resultDeleteResponse.message }
        })
    }

    return response.status(204).send()
}