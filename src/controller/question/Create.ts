import { Request, Response } from 'express'
import { Question } from '@prisma/client'

import { CreateQuestionService } from '../../services/questionServices/CreateQuestionService'
import { QuestionRepository } from '../../repositories/QuestionRepository'

//Para tipar o body do request
interface IBodyProps extends Omit<Question, 'id'> { }

export const createQuestion = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    const { idCourse, idStudent, question_text } = request.body

    const createQuestion = new CreateQuestionService(new QuestionRepository())
    const resultQuestion = await createQuestion.execute(question_text, idCourse, idStudent)

    if (resultQuestion instanceof Error) {
        return response.status(500).json({
            errors: { default: resultQuestion.message }
        })
    }

    return response.status(201).json(resultQuestion)
}