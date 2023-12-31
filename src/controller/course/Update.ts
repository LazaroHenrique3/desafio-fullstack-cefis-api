import { Request, Response } from 'express'
import * as yup from 'yup'
import { Course } from '@prisma/client'

import { UpdateCourseService } from '../../services/courseServices/UpdateCourseService'
import { CourseRepository } from '../../repositories/CourseRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

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

    //Como esta rota é privada se chegou até aqui significa que passou pela autenticação e foi inserido o id do user extraído do token para dentro dos headers
    const idUserToken: number = (request.headers.idUser) ? Number(request.headers.idUser) : 0

    const updateCourse = new UpdateCourseService(new CourseRepository())
    const resultUpdateCourse = await updateCourse.execute(Number(idCourse), String(title), Number(duration), idUserToken)

    if(resultUpdateCourse instanceof CustomError){
        return response.status(resultUpdateCourse.status).json({
            errors: { default: resultUpdateCourse.message }
        })
    } 

    return response.status(200).json(resultUpdateCourse)
}