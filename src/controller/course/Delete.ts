import { Request, Response } from 'express'
import * as yup from 'yup'

import { DeleteCourseService } from '../../services/courseServices/DeleteCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

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

    //Como esta rota é privada se chegou até aqui significa que passou pela autenticação e foi inserido o id do user extraído do token para dentro dos headers
    const idUserToken: number = (request.headers.idUser) ? Number(request.headers.idUser) : 0

    const deleteCourse = new DeleteCourseService(new CourseRepository())
    const resultDeleteCourse = await deleteCourse.execute(Number(idCourse), idUserToken)

    if(resultDeleteCourse instanceof CustomError){
        return response.status(resultDeleteCourse.status).json({
            errors: { default: resultDeleteCourse.message }
        })
    } 


    return response.status(204).send()
}