import { IResponseRepository } from '../../interfaces/IResponseRepository'

class CountResponseService {
    constructor (private ResponseRepository: IResponseRepository) {}

    public async execute(idQuestion: number) {
        const countOfResponses = await this.ResponseRepository.count(idQuestion)
        return countOfResponses
    }
}

export { CountResponseService }