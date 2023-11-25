import { IResponseRepository } from '../../interfaces/IResponseRepository'

class UpdateResponseService {
    constructor (private ResponseRepository: IResponseRepository) {}

    public async execute(idResponse: number, textResponse: string) {
        const updatedResponse = await this.ResponseRepository.update(idResponse, textResponse)
        return updatedResponse
    }
}

export { UpdateResponseService }