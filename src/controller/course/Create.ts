import { Request, Response } from 'express'
import { Course } from '@prisma/client'

import { CreateCourseService } from '../../services/courseServices/CreateCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'

//Para tipar o body do request
interface IBodyProps extends Omit<Course, 'id'> { }

export const createCourse = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { title, duration, teacherId } = request.body

    const createCourse = new CreateCourseService(new CourseRepository())
    const resultCourse = await createCourse.execute(title, duration, teacherId)

    if (resultCourse instanceof Error) {
        return response.status(500).json({
            errors: { default: resultCourse.message }
        })
    }

    return response.status(201).json(resultCourse)
}