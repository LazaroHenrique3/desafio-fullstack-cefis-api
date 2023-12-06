import { Request, Response } from 'express'
import * as yup from 'yup'

import { DeleteQuestionService } from '../../services/questionServices/DeleteQuestionService'
import { QuestionRepository } from '../../repositories/QuestionRepository'
import { validation } from '../../middlewares/Validation'
import { CustomError } from '../../errors/CustomErrors'

//Para tipar os params do request
interface IParamProps {
    idQuestion?: number
}

export const deleteQuestionValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        idQuestion: yup.number().integer().required().moreThan(0),
    })),
}))

export const deleteQuestion = async (request: Request<IParamProps>, response: Response) => {
    const { idQuestion } = request.params

    //Como esta rota é privada se chegou até aqui significa que passou pela autenticação e foi inserido o id do user extraído do token para dentro dos headers
    const idUserToken: number = (request.headers.idUser) ? Number(request.headers.idUser) : 0

    const deleteQuestion = new DeleteQuestionService(new QuestionRepository())
    const resultDeleteQuestion = await deleteQuestion.execute(Number(idQuestion), idUserToken)

    if (resultDeleteQuestion instanceof CustomError) {
        return response.status(resultDeleteQuestion.status).json({
            errors: { default: resultDeleteQuestion.message }
        })
    }

    return response.status(204).send()
}