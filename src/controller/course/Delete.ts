import { Request, Response } from 'express'
import * as yup from 'yup'

import { DeleteCourseService } from '../../services/courseServices/DeleteCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'
import { validation } from '../../middlewares/Validation'

//Para tipar os params do request
interface IParamProps {
    idCourse?: number
}

export const deleteCourseValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idCourse: yup.number().integer().required().moreThan(0),
    })),
}))

export const deleteCourse = async (request: Request<IParamProps>, response: Response) => {
    const { idCourse } = request.params

    const deleteCourse = new DeleteCourseService(new CourseRepository())
    const resultDeleteCourse = await deleteCourse.execute(Number(idCourse))

    if(resultDeleteCourse instanceof Error){
        return response.status(500).json({
            errors: { default: resultDeleteCourse.message }
        })
    } 


    return response.status(204).send()
}