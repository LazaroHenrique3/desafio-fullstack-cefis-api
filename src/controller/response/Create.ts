import { Request, Response } from 'express'
import * as yup from 'yup'
import { Response as IResponse } from '@prisma/client'

import { CreateResponseService } from '../../services/responseServices/CreateResponseService'
import { ResponseRepository } from '../../repositories/ResponseRepository'
import { validation } from '../../middlewares/Validation'

//Para tipar o body do request
interface IBodyProps extends Omit<IResponse, 'id'> { }

export const createResponseValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        response_text: yup.string().required(),
        idQuestion: yup.number().integer().required().moreThan(0),
    }))
}))

export const createResponse = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { idQuestion, response_text } = request.body

    const createResponse = new CreateResponseService(new ResponseRepository())
    const resultResponse = await createResponse.execute(String(response_text), idQuestion)

    if (resultResponse instanceof Error) {
        return response.status(500).json({
            errors: { default: resultResponse.message }
        })
    }

    return response.status(201).json(resultResponse)
}