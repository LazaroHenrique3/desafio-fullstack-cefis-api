import { Request, Response } from 'express'

import { GetCourseByIdService } from '../../services/courseServices/GetCourseById'
import { CourseRepository } from '../../repositories/CourseRepository'

//Para tipar os params do request
interface IParamProps {
    idCourse?: number
}

export const getCourseById = async (request: Request<IParamProps>, response: Response) => {
    const { idCourse } = request.params

    const getCourseById = new GetCourseByIdService(new CourseRepository())
    const resultGetCourseById = await getCourseById.execute(Number(idCourse))

    if (resultGetCourseById instanceof Error) {
        return response.status(500).json({
            errors: { default: resultGetCourseById.message }
        })
    } else if (resultGetCourseById === null || resultGetCourseById === undefined) {
        return response.status(404).json({
            errors: { default: 'Registro não encontado.' }
        })
    }

    return response.status(200).json(resultGetCourseById)
}