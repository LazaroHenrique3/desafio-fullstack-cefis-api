import { Request, Response } from 'express'
import * as yup from 'yup'
import { Course } from '@prisma/client'

import { UpdateCourseService } from '../../services/courseServices/UpdateCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'
import { validation } from '../../middlewares/Validation'

//Para tipar o body do request
interface IBodyProps extends Omit<Course, 'id' | 'teacherId'> { }

//Para tipar os params do request
interface IParamProps {
    idCourse?: number
}

export const updateCourseValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idCourse: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        title: yup.string().required(),
        duration: yup.number().integer().moreThan(0).required()
    }))
}))

export const updateCourse = async (request: Request<IParamProps, {}, IBodyProps>, response: Response) => {
    const { title, duration } = request.body
    const { idCourse } = request.params

    const updateCourse = new UpdateCourseService(new CourseRepository())
    const resultUpdateCourse = await updateCourse.execute(Number(idCourse), String(title), Number(duration))

    if(resultUpdateCourse instanceof Error){
        return response.status(500).json({
            errors: { default: resultUpdateCourse.message }
        })
    } 

    return response.status(200).json(resultUpdateCourse)
}