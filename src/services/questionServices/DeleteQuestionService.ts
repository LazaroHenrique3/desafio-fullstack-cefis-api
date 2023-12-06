import { CustomError } from '../../errors/CustomErrors'
import { IQuestionRepository } from '../../interfaces/IQuestionRepository'
import { checkIfQuestionExists, checkIfThisUserIsTheAuthorOfTheQuestion } from '../utils/checkFunctions'

class DeleteQuestionService {
    constructor(private QuestionService: IQuestionRepository) { }

    public async execute(idQuestion: number, idUserToken: number) {
        //verificando se a Question existe
        const quetionExists = await checkIfQuestionExists(idQuestion)
        if (!quetionExists) {
            return new CustomError('Pergunta não encontrada.', 404)
        }

        //Verificando se o aluno que solicitou a exclusão da pergunta foi de fato quem a cadastrou
        const isAuthor = await checkIfThisUserIsTheAuthorOfTheQuestion(idQuestion, idUserToken)
        if(!isAuthor) {
            return new CustomError('Não tem permissão para esse tipo de ação.', 401)
        }

        const deletedQuestion = await this.QuestionService.delete(idQuestion)
        return deletedQuestion
    }
}

export { DeleteQuestionService }