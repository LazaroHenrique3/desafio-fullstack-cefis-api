import { CustomError } from '../../errors/CustomErrors'
import { IQuestionRepository } from '../../interfaces/IQuestionRepository'
import { checkIfQuestionExists } from '../utils/checkFunctions'

class DeleteQuestionService {
    constructor(private QuestionService: IQuestionRepository) { }

    public async execute(idQuestion: number) {
        //verificando se a Question existe
        const quetionExists = await checkIfQuestionExists(idQuestion)
        if (!quetionExists) {
            return new CustomError('Pergunta não encontrada.', 404)
        }

        const deletedQuestion = await this.QuestionService.delete(idQuestion)
        return deletedQuestion
    }
}

export { DeleteQuestionService }