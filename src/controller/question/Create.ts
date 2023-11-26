import { Request, Response } from 'express'
import * as yup from 'yup'
import { Question } from '@prisma/client'

import { CreateQuestionService } from '../../services/questionServices/CreateQuestionService'
import { QuestionRepository } from '../../repositories/QuestionRepository'
import { validation } from '../../middlewares/Validation'

//Para tipar o body do request
interface IBodyProps extends Omit<Question, 'id'> { }

//Middleware
export const createQuestionValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        question_text: yup.string().required(),
        idCourse: yup.number().integer().required().moreThan(0),
        idStudent: yup.number().integer().required().moreThan(0),
    }))
}))

export const createQuestion = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { idCourse, idStudent, question_text } = request.body

    const createQuestion = new CreateQuestionService(new QuestionRepository())
    const resultQuestion = await createQuestion.execute(String(question_text), Number(idCourse), Number(idStudent))

    if (resultQuestion instanceof Error) {
        return response.status(500).json({
            errors: { default: resultQuestion.message }
        })
    }

    return response.status(201).json(resultQuestion)
}