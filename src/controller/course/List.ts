import { Request, Response } from 'express'
import * as yup from 'yup'

import { DefaultQueryParams } from '.././constants/DefaultQueryParams'
import { ListCourseService } from '../.././services/courseServices/ListCourseService'
import { CountCourseService } from '../.././services/courseServices/CountCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Validando os query Params
interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string,
    orderBy?: 'asc' | 'desc',
    teacherId?: number //Listar por professor
}

//Midleware
export const listCourseValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
        orderBy: yup.string().oneOf(['asc', 'desc']).optional(),
        teacherId: yup.number().nullable().moreThan(0).optional()
    }))
}))

export const listCourse = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {
    const { page, limit, filter, orderBy, teacherId } = request.query

    const listCourses = new ListCourseService(new CourseRepository())
    const countCourses = new CountCourseService(new CourseRepository())

    const resultCourses = await listCourses.execute(
        Number(page) || DefaultQueryParams.DEFAULT_PAGE, 
        Number(limit) || DefaultQueryParams.DEFAULT_LIMIT, 
        filter || DefaultQueryParams.DEFAULT_FILTER, 
        orderBy as 'asc' | 'desc' || DefaultQueryParams.DEFAULT_ORDER_BY,
        Number(teacherId) || null
    )

    const resultCountCourses = await  countCourses.execute(
        filter || DefaultQueryParams.DEFAULT_FILTER,
        Number(teacherId) || null
    )

    if(resultCourses instanceof CustomError){
        return response.status(resultCourses.status).json({
            errors: { default: resultCourses.message }
        })
    } else if (resultCountCourses instanceof CustomError) {
        return response.status(resultCountCourses.status).json({
            errors: { default: resultCountCourses.message }
        })
    }

    if(resultCourses.length === 0){
        return response.status(404).json({
            errors: { default: 'Registro(s) não encontrado(s).' }
        })
    }

    //Adicionando a quantidade de usuarios encontrados no Header
    response.setHeader('access-control-expose-headers', 'x-total-count')
    response.setHeader('x-total-count', resultCountCourses)

    return response.status(200).json(resultCourses)
}