import { Request, Response } from 'express'
import * as yup from 'yup'
import { Course } from '@prisma/client'

import { CreateCourseService } from '../../services/courseServices/CreateCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'
import { validation } from '../../middlewares/Validation'

//Para tipar o body do request
interface IBodyProps extends Omit<Course, 'id'> { }

//Midleware
export const createCourseValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        title: yup.string().required(),
        teacherId: yup.number().integer().moreThan(0).required(),
        duration: yup.number().integer().moreThan(0).required()
    }))
}))

export const createCourse = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { title, duration, teacherId } = request.body

    const createCourse = new CreateCourseService(new CourseRepository())
    const resultCourse = await createCourse.execute(String(title), duration, teacherId)

    if (resultCourse instanceof Error) {
        return response.status(500).json({
            errors: { default: resultCourse.message }
        })
    }

    return response.status(201).json(resultCourse)
}