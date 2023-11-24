import { Request, Response } from 'express'

import { DeleteCourseService } from '../../services/courseServices/DeleteCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'

//Para tipar os params do request
interface IParamProps {
    idCourse?: number
}

export const deleteCourse = async (request: Request<IParamProps>, response: Response) => {
    const { idCourse } = request.params

    const deleteCourse = new DeleteCourseService(new CourseRepository())
    const resultDeleteCourse = await deleteCourse.execute(Number(idCourse))

    if(resultDeleteCourse instanceof Error){
        return response.status(500).json({
            errors: { default: resultDeleteCourse.message }
        })
    } else if (resultDeleteCourse === null) {
        return response.status(404).json({
            errors: { default: 'Registro não encontado para exclusão.' }
        })
    }


    return response.status(204).send()
}