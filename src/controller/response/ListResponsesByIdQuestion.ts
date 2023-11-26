import { Request, Response } from 'express'
import * as yup from 'yup'

import { DefaultQueryParams } from '.././constants/DefaultQueryParams'
import { ListResponseByIdCourseService } from '../../services/responseServices/ListResponseByIdQuestionService'
import { CountResponseService } from '../.././services/responseServices/CountResponseService'
import { ResponseRepository } from '../../repositories/ResponseRepository'
import { validation } from '../../middlewares/Validation'

//Validando os query Params
interface IQueryProps {
    page?: number,
    limit?: number,
    orderBy?: 'asc' | 'desc',
}

//Para tipar os params do request
interface IParamProps {
    idQuestion?: number
}

//Midleware
export const listResponsesByIdQuestionValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idQuestion: yup.number().integer().required().moreThan(0),
    })),
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        orderBy: yup.string().oneOf(['asc', 'desc']).optional()
    }))
}))

export const ListResponsesByIdQuestion = async (request: Request<IParamProps, {}, {}, IQueryProps>, response: Response) => {
    const { page, limit, orderBy } = request.query
    const { idQuestion } = request.params

    const listResponses = new ListResponseByIdCourseService(new ResponseRepository())
    const countResponses = new CountResponseService(new ResponseRepository())

    const resultResponses = await listResponses.execute(
        Number(page) || DefaultQueryParams.DEFAULT_PAGE, 
        Number(limit) || DefaultQueryParams.DEFAULT_LIMIT, 
        String(orderBy) as 'asc' | 'desc' || DefaultQueryParams.DEFAULT_ORDER_BY,
        Number(idQuestion)
    )

    const resultCountResponses = await  countResponses.execute(
        Number(idQuestion)
    )

    if(resultResponses instanceof Error){
        return response.status(500).json({
            errors: { default: resultResponses.message }
        })
    } else if (resultCountResponses instanceof Error) {
        return response.status(500).json({
            errors: { default: resultCountResponses.message }
        })
    }

    if(resultResponses.length === 0){
        return response.status(404).json({
            errors: { default: 'Registro(s) não encontrado(s).' }
        })
    }

    //Adicionando a quantidade de usuarios encontrados no Header
    response.setHeader('access-control-expose-headers', 'x-total-count')
    response.setHeader('x-total-count', resultCountResponses)

    return response.status(200).json(resultResponses)
}