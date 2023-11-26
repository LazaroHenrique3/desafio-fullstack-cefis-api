import { Request, Response } from 'express'
import * as yup from 'yup'
import { Response as IResponse } from '@prisma/client'

import { CreateResponseService } from '../../services/responseServices/CreateResponseService'
import { ResponseRepository } from '../../repositories/ResponseRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Para tipar o body do request
interface IBodyProps extends Omit<IResponse, 'id'> { }

//Para tipar os params do request
interface IParamProps {
    idTeacher?: number
}

//Middleware
export const createResponseValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idTeacher: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        response_text: yup.string().required(),
        idQuestion: yup.number().integer().required().moreThan(0),
    }))
}))

export const createResponse = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    const { idQuestion, response_text } = request.body
    const { idTeacher } = request.params

    const createResponse = new CreateResponseService(new ResponseRepository())
    const resultResponse = await createResponse.execute(String(response_text), Number(idQuestion), Number(idTeacher))

    if (resultResponse instanceof CustomError) {
        return response.status(resultResponse.status).json({
            errors: { default: resultResponse.message }
        })
    }

    return response.status(201).json(resultResponse)
}