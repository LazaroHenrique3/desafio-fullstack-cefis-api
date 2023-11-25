import { IQuestionRepository } from '../../interfaces/IQuestionRepository'

class DeleteQuestionService {
    constructor (private QuestionService: IQuestionRepository) {}

    public async execute (idQuestion: number) {
        const deletedQuestion = await this.QuestionService.delete(idQuestion)
        return deletedQuestion
    }
}

export { DeleteQuestionService }