import { IQuestionRepository } from '../../interfaces/IQuestionRepository'

class ListQuestionByIdCourseService {
    constructor (private QuestionRepository: IQuestionRepository) {}

    public async execute(page: number, limit: number, orderBy: 'asc' | 'desc', idQuestion: number) {
        const question = await this.QuestionRepository.listByIdCourse(page, limit, orderBy, idQuestion)
        return question
    }
}

export { ListQuestionByIdCourseService }