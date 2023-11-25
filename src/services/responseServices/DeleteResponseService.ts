import { IResponseRepository } from '../../interfaces/IResponseRepository'

class DeleteResponseService {
    constructor (private ResponseService: IResponseRepository) {}

    public async execute (idResponse: number) {
        const deletedResponse = await this.ResponseService.delete(idResponse)
        return deletedResponse
    }
}

export { DeleteResponseService }