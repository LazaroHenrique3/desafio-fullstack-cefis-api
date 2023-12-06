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

    const deleteResponse = new DeleteResponseService(new ResponseRepository())
    const resultDeleteResponse = await deleteResponse.execute(Number(idResponse))

    if(resultDeleteResponse instanceof CustomError){
        return response.status(resultDeleteResponse.status).json({
            errors: { default: resultDeleteResponse.message }
        })
    } 

    return response.status(204).send()
}