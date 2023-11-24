import { Request, Response } from 'express'
import { Course } from '@prisma/client'

import { UpdateCourseService } from '../../services/courseServices/UpdateCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'

//Para tipar o body do request
interface IBodyProps extends Omit<Course, 'id'> { }

//Para tipar os params do request
interface IParamProps {
    idCourse: number
}

export const updateCourse = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    const { title, duration } = request.body
    const { idCourse } = request.params

    const updateCourse = new UpdateCourseService(new CourseRepository())
    const resultUpdateCourse = await updateCourse.execute(Number(idCourse), title, duration)

    if(resultUpdateCourse instanceof Error){
        return response.status(500).json({
            errors: { default: resultUpdateCourse.message }
        })
    } else if (resultUpdateCourse === null) {
        return response.status(404).json({
            errors: { default: 'Registro não encontado para atualização.' }
        })
    }

    return response.status(200).json(resultUpdateCourse)
}