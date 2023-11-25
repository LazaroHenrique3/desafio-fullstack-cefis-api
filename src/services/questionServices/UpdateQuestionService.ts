import { IQuestionRepository } from '../../interfaces/IQuestionRepository'

class UpdateQuestionService {
    constructor (private QuestionRepository: IQuestionRepository) {}

    public async execute(idQuestion: number, textQuestion: string) {
        const updatedQuestion = await this.QuestionRepository.update(idQuestion, textQuestion)
        return updatedQuestion
    }
}

export { UpdateQuestionService }