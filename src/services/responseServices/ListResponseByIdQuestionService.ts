import { IResponseRepository } from '../../interfaces/IResponseRepository'

class ListResponseByIdCourseService {
    constructor (private ResponseRepository: IResponseRepository) {}

    public async execute(page: number, limit: number, orderBy: 'asc' | 'desc', idQuestion: number) {
        const response = await this.ResponseRepository.listByIdQuestion(page, limit, orderBy, idQuestion)
        return response
    }
}

export { ListResponseByIdCourseService }