import { IResponseRepository } from '../../interfaces/IResponseRepository'

class CreateResponseService {
    constructor (private ResponseRepository: IResponseRepository) { }

    public async execute(responseText: string, idQuestion: number) {
        const newResponse = await this.ResponseRepository.create(responseText, idQuestion)
        return newResponse
    }
}

export { CreateResponseService }