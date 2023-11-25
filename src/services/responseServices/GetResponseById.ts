import { IResponseRepository } from '../../interfaces/IResponseRepository'

class GetResponseByIdService {
    constructor (private ResponseService: IResponseRepository) {}

    public async execute (idResponse: number) {
        const response = await this.ResponseService.getById(idResponse)
        return response
    }
}

export { GetResponseByIdService }