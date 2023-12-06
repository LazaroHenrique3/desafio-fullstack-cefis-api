import { CustomError } from '../../errors/CustomErrors'
import { IResponseRepository } from '../../interfaces/IResponseRepository'
import { checkIfResponseExists } from '../utils/checkFunctions'

class DeleteResponseService {
    constructor(private ResponseService: IResponseRepository) { }

    public async execute(idResponse: number) {
        //verificando se a Response existe
        const quetionExists = await checkIfResponseExists(idResponse)
        if (!quetionExists) {
            return new CustomError('Resposta não encontrada.', 404)
        }

        const deletedResponse = await this.ResponseService.delete(idResponse)
        return deletedResponse
    }
}

export { DeleteResponseService }