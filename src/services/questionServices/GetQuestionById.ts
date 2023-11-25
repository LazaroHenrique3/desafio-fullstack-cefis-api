import { IQuestionRepository } from '../../interfaces/IQuestionRepository'

class GetQuestionByIdService {
    constructor (private QuestionService: IQuestionRepository) {}

    public async execute (idQuestion: number) {
        const question = await this.QuestionService.getById(idQuestion)
        return question
    }
}

export { GetQuestionByIdService }