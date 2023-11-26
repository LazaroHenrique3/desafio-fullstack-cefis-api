import { Request, Response } from 'express'
import * as yup from 'yup'

import { DefaultQueryParams } from '.././constants/DefaultQueryParams'
import { ListQuestionByIdCourseService } from '../.././services/questionServices/ListQuestionByIdCourseService'
import { CountQuestionService } from '../.././services/questionServices/CountQuestionService'
import { QuestionRepository } from '../../repositories/QuestionRepository'
import { validation } from '../../middlewares/Validation'

//Validando os query Params
interface IQueryProps {
    page?: number,
    limit?: number,
    orderBy?: 'asc' | 'desc',
}

//Para tipar os params do request
interface IParamProps {
    idCourse?: number
}

//Midleware
export const listQuestionsByIdCourseValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idCourse: yup.number().integer().required().moreThan(0),
    })),
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        orderBy: yup.string().oneOf(['asc', 'desc']).optional()
    }))
}))

export const ListQuestionsByIdCourse = async (request: Request<IParamProps, {}, {}, IQueryProps>, response: Response) => {
    const { page, limit, orderBy } = request.query
    const { idCourse } = request.params

    const listQuestions = new ListQuestionByIdCourseService(new QuestionRepository())
    const countQuestions = new CountQuestionService(new QuestionRepository())

    const resultQuestions = await listQuestions.execute(
        Number(page) || DefaultQueryParams.DEFAULT_PAGE, 
        Number(limit) || DefaultQueryParams.DEFAULT_LIMIT, 
        String(orderBy) as 'asc' | 'desc' || DefaultQueryParams.DEFAULT_ORDER_BY,
        Number(idCourse)
    )

    const resultCountQuestions = await  countQuestions.execute(
        Number(idCourse)
    )

    if(resultQuestions instanceof Error){
        return response.status(500).json({
            errors: { default: resultQuestions.message }
        })
    } else if (resultCountQuestions instanceof Error) {
        return response.status(500).json({
            errors: { default: resultCountQuestions.message }
        })
    }

    if(resultQuestions.length === 0){
        return response.status(404).json({
            errors: { default: 'Registro(s) não encontrado(s).' }
        })
    }

    //Adicionando a quantidade de usuarios encontrados no Header
    response.setHeader('access-control-expose-headers', 'x-total-count')
    response.setHeader('x-total-count', resultCountQuestions)

    return response.status(200).json(resultQuestions)
}