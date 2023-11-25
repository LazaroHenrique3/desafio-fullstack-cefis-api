import { Request, Response } from 'express'
import { Response as IResponse } from '@prisma/client'

import { CreateResponseService } from '../../services/responseServices/CreateResponseService'
import { ResponseRepository } from '../../repositories/ResponseRepository'

//Para tipar o body do request
interface IBodyProps extends Omit<IResponse, 'id'> { }

export const createResponse = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { idQuestion, response_text } = request.body

    const createResponse = new CreateResponseService(new ResponseRepository())
    const resultResponse = await createResponse.execute(response_text, idQuestion)

    if (resultResponse instanceof Error) {
        return response.status(500).json({
            errors: { default: resultResponse.message }
        })
    }

    return response.status(201).json(resultResponse)
}