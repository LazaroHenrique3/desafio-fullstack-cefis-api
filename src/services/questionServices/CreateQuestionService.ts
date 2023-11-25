import { IQuestionRepository } from '../../interfaces/IQuestionRepository'

class CreateQuestionService {
    constructor (private QuestionRepository: IQuestionRepository) { }

    public async execute(questionText: string, idCourse: number, idStudent: number) {
        const newQuestion = await this.QuestionRepository.create(questionText, idCourse, idStudent)
        return newQuestion
    }
}

export { CreateQuestionService }