import { IQuestionRepository } from '../../interfaces/IQuestionRepository'

class CountQuestionService {
    constructor (private QuestionRepository: IQuestionRepository) {}

    public async execute(idCourse: number) {
        const countOfQuestions = await this.QuestionRepository.count(idCourse)
        return countOfQuestions
    }
}

export { CountQuestionService }